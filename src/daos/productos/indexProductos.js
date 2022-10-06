import config from '../../utils/config2.js'


let ProductosDAo

switch (config) {
    case 'json':
        const {default: ProductoDaosJSON } = await import('./productosDaosJSON.js')
         ProductosDAo = new ProductoDaosJSON(config.fileSystem.path)
        break;
    case "firebase":
        const {default : ProductosFirebaseDao} = await import('./productosDaosFirebase.js')
         ProductosDAo = new ProductosFirebaseDao()      
        break;
    case 'mongodb': 
        const {default: ProductosMongo} = await import('./productosDAosMONGO.js')
        ProductosDAo = new ProductosMongo ()
        break;
    case ('sql'):
        const {default: ProductosSQL} = await import('./productosDaosSQL.js')
        ProductosDAo = new ProductosSQL ()
    default:
        const {default: ProductoDaosArchivo} = await import('./productoDaos.js')
        ProductosDAo = new ProductoDaosArchivo()
        break;
}

export {ProductosDAo};