import admin from 'firebase-admin';
import config from './utils/config2.js';
import serviceAccount from '../firebase/crt/proyecto-backend-8c4de-firebase-adminsdk-3e2gf-aa6a851744.json' assert {type: "json"};

admin.initializeApp({
  credential : admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export class ContenedorFirebase{
    constructor(nombreColeccion){
        this.productos = db.collection(nombreColeccion)
    }


async save(obj){
  try {
      const guardar = await this.productos.add(obj)
      return{...obj, id:  guardar.id}
  } catch (errors) {
    console.error(errors);
  }
  }

 
async getAll(){
  try {
  const response = []
  const snapshot = await this.productos.get()
  snapshot.forEach(doc =>{
    response.push({id : doc.id, ...doc.data()})
  })
return response;}
catch (err){
  console.log(err);
}
}

  async getById(id) {
 try {
  let doc = await this.productos.doc(id).get();
  if (doc.exists){
    let produc = {id:doc.id , ...doc.data()}
  }else{
    console.log(` no de encontro el numero `)
  }
  
 } catch (error) {
  console.log(error);
  
 }
 return produc;
  
  }

  async actualizar(obj, id) {
  try {
   const actualizado = await this.productos.doc(obj.id).set(obj)
   return actualizado
  } catch (errors) {
    console.log(errors)
  }
}

async deleteByid(id) {
 try {
   await this.productos.doc(id).delete()
   console.log(`se elimino el id: ${id}`)
 } catch (errors) {
  console.error(errors);
 }
 
}
async desconectar() {
}

}