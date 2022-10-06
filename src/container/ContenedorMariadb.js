import knex from "knex";
import { config } from '../utils/configmariadb.js';


export class ContenedorMariadb {
    constructor(nombreTabla){
        this.knexCli = knex(config.db);
        this.nombreTabla = nombreTabla;
    }
async getAll(){
    return await this.knexCli.from(this.nombreTabla).select('*')
}
async getById(id){
    return await this.knexCli.from(this.nombreTabla).select('*').where({id:id});
}

async actualizar(id, obj){
    return await this.knexCli.from(this.nombreTabla).select('*').where({id:id}).update(obj);
}
async save(obj){
    try {
        return await this.knexCli(this.nombreTabla).insert(obj);
    } catch (error) {
        throw error;
    }


}
async delete(id){
    return await this.knexCli.from(this.nombreTabla).where({id:id}).del();

}
 cerrarConexion (){
     this.knexCli.destroy();
}

}