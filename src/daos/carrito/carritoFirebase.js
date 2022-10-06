import { ContenedorFirebase } from "../../ContenedorFirebase.js";

class CarritoFirebaseDao extends ContenedorFirebase{
    constructor (){
        super('carrito')/*,{
          //  productos: {type:[],required:true},
        })*/
    }
   /* async save(carrito= {productos:[]}){
        return super.save(carrito)
    }*/
}
export default CarritoFirebaseDao;
/*import admin from 'firebase-admin'
import { ContenedorFirebase } from '../../ContenedorFirebase.js';
import serviceAccount from '../../../firebase/crt/proyecto-backend-8c4de-firebase-adminsdk-3e2gf-aa6a851744.json' assert {Type:'json'}




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const articulos = [
    { nombre: 'yerba', precio: 850, stock: 100 },
    { nombre: 'galletitas', precio: 10, stock:250 },
    { nombre: 'azucar', precio: 30, stock: 16 },
    { nombre: 'mates', precio: 420, stock: 884 },
    { nombre: 'bombillas', precio: 60, stock: 24 }
]

    
async function index(){
    try {
        const db = admin.firestore
        const carrito = db.collection('carrito')
        await ContenedorFirebase.getAll();


    } catch (error) {
        console.log(error);
    }
}

index();*/