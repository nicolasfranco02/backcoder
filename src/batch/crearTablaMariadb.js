import knex from 'knex';
import { config} from '../utils/configmariadb.js'

        const knexCli1 = knex(config.db);
        
        knexCli1.schema.dropTableIfExists('productos')
                    .then(()=>{
                        knexCli1.schema.createTable('productos', table =>{
                            table.increments('id').primary();
                            table.string('nombre', 50).notNullable();
                            table.string('precio', 50).notNullable();
                    })
                    .then(()=> console.log('tabla creada'))
                    .catch(err=> {
                        console.log(err); 
                        throw err;
                    })
                    .finally(()=>{
                        knexCli1.destroy();
                    });
                });