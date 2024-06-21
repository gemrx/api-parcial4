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

        response.status(200).json({ message: 'Usuario creado' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno, no se pudo creat el usuario' });
    }
}

export async function authenticateUser(request, response) {
    try {
        // 1. obtener el username y password
        const  username = request.body.username;
        const  password = request.body.password;
        
        // 2. verificar si existe ese username en la base de datos
        const user = await User.findOne({ username: username });
        if (!user) {
            return response.status(401).json({ error: 'Autenticación fallida. Usuario no encontrado.' });
        }
        
        // 3. verificar que el password coincida con el password guardado en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(401).json({ error: 'Autenticación fallida. Contraseña incorrecta.' });
        }
        
        // 4. crear un JWT y guardar el id del usuario en el payload del JWT
        const token = jwt.sign({ userId: user._id }, 'to', { expiresIn: '5h' });

        // 5. devolver JSON con el JWT del usuario
        response.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno, no se pudo autenticar el usuario' });
    }
}

export async function getUserInfo(request, response) {
    try {
        // 1. obtener el id del usuario del request.header
        const token = request.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, 'token-llave'); 
        const userId = decodedToken.userId;

        // 2. buscar al usuario por su id en la base de datos
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // 3. devolver un JSON con la informacion del usuario
        response.status(200).json({
            username: user.username,
            fullName: user.fullName,
            
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error interno, no se pudo obtener la información del usuario.' });
    }
}