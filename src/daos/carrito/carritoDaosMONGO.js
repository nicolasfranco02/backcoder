import { ContenedorMongo } from "../../ContenedorMongo.js";

export class CarritoMongo extends ContenedorMongo{

    constructor(){
        super('carrito',{
        nombre : {type : String, required: true},
        precio: {type : Number, required: true},
        stock : {type : Number, required: true}
    })
    }
}
export default CarritoMongo;