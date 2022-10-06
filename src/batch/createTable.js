import knex from "knex";
import { config } from '../utils/config.js';


const knexCli = knex(config.db);

knexCli.schema.dropTableIfExists('productos')
            .then(()=>{
                knexCli.schema.createTable('productos', table =>{
                    table.increments('id').primary();
                    table.string('user', 50).notNullable();
                    table.string('contenidoproductos', 50).notNullable();
            })
            .then(()=> console.log('tabla creada'))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
        });

        
     