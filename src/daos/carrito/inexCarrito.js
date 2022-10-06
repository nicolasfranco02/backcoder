import config from '../../utils/config2.js';


let CarritoDAO

switch (config) {
    case 'json':
        const {default : CArritoJSONDaos } = await import('./carritoDAosJSON.js')
         CarritoDAO = new CArritoJSONDaos(config.fileSystem.path)
        break;
    case "firebase":
        const {default : CarritoFirebaseDao} = await import('./carritoFirebase.js')
         CarritoDAO = new CarritoFirebaseDao()      
        break;
    case 'mongodb': 
        const {default: CarritoMongo} = await import('./carritoDaosMONGO.js')
        CarritoDAO = new CarritoMongo ()
        break;
        case ('sql'):
            const {default: carritoDaos} = await import('./productosDaosSQL.js')
            ProductosDAo = new carritoDaos ()
    default:
        const {default: CarritoDaosArchivo} = await import('./carritoDaos.js')
        CarritoDAO = new CarritoDaosArchivo()
        break;
}

export {CarritoDAO};