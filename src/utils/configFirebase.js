/*import admin, { firestore } from 'firebase-admin';
import serviceAccount from '../../firebase/crt/proyecto-backend-8c4de-firebase-adminsdk-3e2gf-aa6a851744.json' assert {Type: 'json'};

 function firebaseIniciador (){
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  async function index(){
      try {
          const db = admin.firestore
          const productos = db.collection('productos')
  
      } catch (error) {
          console.log(error);
      }
  }
  
  index();
}

export default firebaseIniciador;*/