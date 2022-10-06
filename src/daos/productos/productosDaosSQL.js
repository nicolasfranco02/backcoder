import { knexCli } from "../../batch/ProductosSQL.js";
import { ContenedorSQL } from "../../ContenedorSQL.js";



export class productosSQL extends ContenedorSQL{
    constructor(knexCli){
        super(knexCli)
    }
}