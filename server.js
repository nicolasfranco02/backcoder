/* modulos*/
import express from 'express';
import   {Server as HttpServer } from 'http';
import  { Server as IOServer} from 'socket.io'
import path from 'path'
import exphbs from 'express-handlebars';
import {ProductosDAo} from './src/daos/productos/indexProductos.js';
import { CarritoDAO } from './src/daos/carrito/inexCarrito.js';
import { faker } from '@faker-js/faker';
import session, { Cookie } from 'express-session';  
import dotenv from 'dotenv';
import connectMOngo from 'connect-mongo';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { normalize , schema } from 'normalizr';
import {usuarioMongo} from './src/daos/session/sesiones.js';

import {config} from './src/utils/confirfMongo.js'

dotenv.config()

const UsuarioBD = [];


/*----------------- passport / bbcrypt------------*/
import passport from 'passport';
import {Strategy} from "passport-local";

const  LocalStrategy = Strategy;

passport.use (new LocalStrategy(
    async function(username , password, done){
        const usuarioCreado = await  usuarioMongo.find(usuario => usuario.nombre = username  );
        if (!usuarioCreado){
            return done(null, false);
        }else {
            const match = await verifyPass(usuarioCreado, password);
            if(!match){
                return done(null, false);
            }
            return done (null ,  usuarioCreado);
        }
    }
))

passport.serializeUser((usuario , done) => {
    done( null, usuario.nombre)
})
passport.deserializeUser((nombre, done) => {
    const usuarioCreado = usuarioMongo.find(usuario => usuario.nombre == nombre);
    done (null ,usuarioCreado);
});

async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}
async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password);
    return match;
}


/* instancia server*/
const app= express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


/*base de datos */
const DB_PRODUCTOS = ProductosDAo
const DB_MENSAJES= CarritoDAO

/*------mongoatlas------*/
const MongoSTore= connectMOngo.create({
    mongoUrl: 'mongodb+srv://nicolas:Radiohead02@cluster0.onm9rr1.mongodb.net/sessions?retryWrites=true&w=majority',
    ttl:600000,
    mongoOptions: {

    }
})



app.use(session({
    store: MongoSTore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    Cookie:{
        maxAge:10000
    }
})) 

/*------------ mongo-----------*/
const strConn = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`
async function MongoBaseDatos (){
    try{
        
        const conn = await mongoose.connect(strConn, config.db.options);
        console.log( `conectados en mongo`)


    }
    catch(error){
        console.log(error)
    }
}
MongoBaseDatos() 
function aut (req, res, next) {
    if (req.isAuthenticated()) {
        next ()
}else {
    res.redirect( '/login')
}
}
app.use(passport.initialize());
app.use(passport.session());


/* middlewares*/

app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended : true }));

/*motor de plantilla*/
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'hbs'
}));
app.set('views', './views');
app.set('view engine','hbs');

/*----------normalizacion------- */



// esquema autor

const schemaAutor = new schema.Entity('autor', {}, {idAtribute: 'email'});
// esquema mensaje
const schemaMensaje = new schema.Entity('post', {autor: schemaAutor}, {idAtribute: 'id'});
//esquema post 
const schemaMensajesEnviados = new schema.Entity('enviados', {mensaje: [schemaMensaje]}, {idAtribute: 'id'});

const normalizado = (mensajeconid) =>normalize(mensajeconid, schemaMensajesEnviados);




faker.locale = 'es'

/*rutas */

app.get('/' , (req, res) =>{
    res.redirect('/login')
})

app.get('/register', (req, res )=>{

    res.render( 'formularioinicio.hbs'  )
})


app.post('/register',async (req, res )=>{
  const {nombre , password} = req.body;

  const nuevoUsuario = usuarioMongo.find(usuario => usuario.nombre == nombre);
  
  if (nuevoUsuario){
    res.redirect('/register-error')
  }else {
    await usuarioMongo.create({
        nombre,
        password: await generateHashPassword(password)
    })
    res.redirect('/login')
  }
})

app.get('/register-error', (req, res) => {
res.render('errorsesion.hbs')
})


app.get('/login', (req, res )=>{

    res.render( 'login.hbs'  )
})
app.post('/login', passport.authenticate('local', {successRedirect:'/api/productos-test', failureMessage:'/login'}))

app.get('/login-error', (req, res) => {
        res.render('errorsesion.hbs');
    })
    


app.get('/api/productos-test',aut, async (req, res)=>{
 
   const cantidad = 5
   const productos =[]
   for (let i=1; i<=cantidad; i++) {    
    const produc ={
        id :1,
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        imagen: `${faker.image.imageUrl()}`,
        
    }
    productos.push(produc);}
      
    res.render('vistas' , {productos});
     
})

app.post('/personas', aut, async (req, res)=>{
   await DB_MENSAJES.save(req.body);
    res.redirect('/api/productos-test');
});

app.get('/logout', (req, res)=> {
    req.logOut(err => {
        res.redirect('/');
    });
})


/*-------------------socket----------------*/
io.on('connection', async socket=> {
    console.log(`socket connected ${socket.id}`);
    
    // carga de productos
socket.emit('productos', await DB_PRODUCTOS.getAll())

socket.on('update', async productos => {
    await DB_PRODUCTOS.save(productos);
    io.sockets.emit('productos', await DB_PRODUCTOS.getAll());
})
//----------------- carga mensajes
socket.emit('mensajes', await mensajesNormalizados());

socket.on('mensajeNuevo', async mensaje =>{
    mensaje.fecha= new Date().toLocaleDateString();
    await DB_MENSAJES.save(mensaje)
    io.sockets.emit('mensaje', await mensajesNormalizados());
})


    async function mensajesNormalizados() {
        const mensajes = await DB_MENSAJES.getAll();
        const normalizados = normalizado({id: 'mensajes', mensajes})
        return normalizados
    }

   });


   /* servidores */
const PORT = process.env.PORT
const  server = httpServer.listen(PORT, () =>{
    console.log(`servidor ${server.address().port}`)
});

server.on('error', err=>console.log(`error en servidor:${err}`));
