import jwt from 'jsonwebtoken';

function validateJwtToken(request, response, next) {

    // verificar que el request tenga authorization header
    const authHeader = request.get('Authorization');
    if (!authHeader) {
        return response.status(401).json({ error: 'Authorization header is missing' });
    }

    // obetner el token del authorization header
    const token = authHeader.split(' ')[1];

    try {
        // obtener el id
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); 
        request.userId = decodedPayload.userId;
        next();
    } catch (error) {
        console.error(error);
        return response.status(401).json({ error: 'Invalid token' });
    }
}

export default validateJwtToken;