import 'dotenv/config'
import User from '../models/user-model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(request, response) {
    try {

        // obtener los datos del request
        const username = request.body.username;
        const password = request.body.password;
        const fullName = request.body.fullName;
        
        // cifrar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // guardar los datos en el modelo User
        const newUser = new User({
            username: username,
            password: hashedPassword,
            fullName: fullName
        });

        // guardar el modelo en mongodb
        await newUser.save();

        response.status(200).json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to create user' });
    }
}

export async function authenticateUser(request, response) {
    try {
        // obtener el username y password
        const  username = request.body.username;
        const  password = request.body.password;
        
        // verificar si existe ese username en la base de datos
        const user = await User.findOne({ username: username });
        if (!user) {
            return response.status(401).json({ error: 'Invalid credentials' });
        }
        
        // verificar que el password coincida con el password guardado en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(401).json({ error: 'Invalid credentials' });
        }
        
        //  crear un JWT y guardar el id del usuario en el payload del JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        //  devolver JSON con el JWT del usuario
        response.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to authenticate user' });
    }
}

export async function getUserInfo(request, response) {
    try {

        const userFound = await User.findById(request.userId);

        if (userFound === null) {
            return response.status(404).json({ error: 'Invalid user id' });
        }

        response.status(200).json({
            username: userFound.username,
            password: userFound.password,
            fullName: userFound.fullName
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to get user information' });
    }
}