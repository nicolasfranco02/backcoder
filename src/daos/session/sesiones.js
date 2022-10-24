import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    nombre: {type: String , required: true},
    password: {type: String , required:true}
})

export const usuarioMongo = model ('session',usuarioSchema);