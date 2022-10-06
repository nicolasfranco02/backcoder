import { ContenedorMongo } from "../../ContenedorMongo.js";

export class ProductosMongo extends ContenedorMongo{

    constructor(){
        super('productos',{
        nombre : {type : String, required: true},
        precio: {type : Number, required: true},
        stock : {type : Number, required: true}
    })
    }
}
export default ProductosMongo;