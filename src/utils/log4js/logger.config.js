import log4js  from "log4js";
import {config} from '../log4js/configlog4.js'

log4js.configure({
    appenders:{
        console: {type: 'console'},
        errorFile: {type: 'file', filename: 'error.log'},
        warningFile: {type: 'file', filename: 'warn.log'},
    },
    categories :{
         default: {appenders : ["console", 'errorFile','warningFile'], level : "trace"},
         consola: { appenders: ["console"], level: "info" },
        archivo1:{appenders: ['errorFile'], level: "error"},
        archivo2:{ appenders: ['warningFile'],level: "warn"}
       
    }

})

let logger = null
if (config.env == 'development') {
    logger = log4js.getLogger()
}

export {logger}
