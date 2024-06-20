import 'dotenv/config'
import User from '../models/user-model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(request, response) {
    /* 
        1. obtener los datos del usuario
        2. hashear el password
        3. guardar el usuario en la base de datos
        4. devolver un JSON con un mensaje de exito
    */

}

export async function authenticateUser(request, response) {
    /* 
        1. obtener el username y password
        2. verificar si existe ese username en la base de datos
        3. verificar que el password coincida con el password guardado en la base de datos
        4. crear un JWT y guardar el id del usuario en el payload del JWT
        5. devolver JSON con el JWT del usuario
    */

}

export async function getUserInfo(request, response) {
    /* 
        1. obtener el id del usuario del request.header
        2. buscar al usuario por su id en la base de datos
        3. devolver un JSON con la informacion del usuario
    */ 
    
}