/* modulos*/
import express from 'express';
import   {Server as HttpServer } from 'http';
import  { Server as IOServer} from 'socket.io'
import path from 'path'
import exphbs from 'express-handlebars';
import {ProductosDAo} from './src/daos/productos/indexProductos.js';
import { CarritoDAO } from './src/daos/carrito/inexCarrito.js';
import { faker } from '@faker-js/faker';
/* instancia server*/
const app= express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


/*base de datos */
const DB_PRODUCTOS = ProductosDAo
const DB_MENSAJES= CarritoDAO



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
import { normalize , schema } from 'normalizr';
// esquema autor

const schemaAutor = new schema.Entity('autor', {}, {idAtribute: 'email'});
// esquema mensaje
const schemaMensaje = new schema.Entity('post', {autor: schemaAutor}, {idAtribute: 'id'});
//esquema post 
const schemaMensajesEnviados = new schema.Entity('enviados', {mensaje: [schemaMensaje]}, {idAtribute: 'id'});

const normalizado = (mensajeconid) =>normalize(mensajeconid, schemaMensajesEnviados);




faker.locale = 'es'

/*rutas */

app.get('/api/productos-test', async (req, res)=>{
   const cantidad = 5
   const productos =[]
   for (let i=1; i<=cantidad; i++) {    
    const produc ={
        id :1,
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        imagen: `${faker.image.imageUrl()}`
          
    }
    productos.push(produc);}
      
    res.render('vistas' , {productos});
     
})

app.post('/personas',async (req, res)=>{
   await DB_MENSAJES.save(req.body);
    res.redirect('/api/productos-test');
});

/* servidores */
const PORT =8080;
const  server = httpServer.listen(PORT, () =>{
    console.log(`servidor ${server.address().port}`)
});

server.on('error', err=>console.log(`error en servidor:${err}`));

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
});

    async function mensajesNormalizados() {
        const mensajes = await DB_MENSAJES.getAll();
        const normalizados = normalizado({id: 'mensajes', mensajes})
        return normalizados
    }
