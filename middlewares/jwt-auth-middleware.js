import jwt from 'jsonwebtoken';

function validateJwtToken(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ error: 'No se proporcionó un token de autorización.' });
        }

        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return response.status(401).json({ error: 'Formato de token inválido.' });
        }

        const decodedToken = jwt.verify(token, 'token-llave'); 

        // Guarda el userId en el objeto request para usarlo más tarde
        request.userId = decodedToken.userId; 
        
        next(); 
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: 'Token inválido.' });
        }
        response.status(500).json({ error: 'Error interno en la validación del token.' });
    }
}

export default validateJwtToken;