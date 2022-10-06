import { ContenedorFirebase } from "../../ContenedorFirebase.js";

class ProductosFirebaseDao extends ContenedorFirebase{
    constructor (){
        super('productos')
    }

}
export default ProductosFirebaseDao;