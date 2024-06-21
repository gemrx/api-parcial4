import 'dotenv/config'
import User from '../models/user-model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(request, response) {
    try {

        // obtener los datos del reuest
        const username = request.body.usernam;
        const password = request.body.password;
        const fullName = request.body.fullName;
        
        // guardar los datos en el modelo User
        const newUser = new User({
            username: username,
            password: password,
            fullName: fullName
        });

        // guardar el modelo en mongodb
        await newUser.save();

        response.status(200).json({ message: 'Usuario creado' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno, no se pudo creat el usuario' });
    }
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