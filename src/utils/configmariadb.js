import { fileURLToPath } from 'url';
import path ,{ dirname} from 'path';

const __filename= fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config ={
    db:{
        client: 'better-sqlite3',
        connection:{
            filename:path.join(__dirname, '../../DB/entrega.db3')
        },
        useNullAsDefault:true
        }
    }