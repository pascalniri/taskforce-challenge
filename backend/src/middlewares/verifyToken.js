import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).send(
            {
                status: 'error',
                message: 'Access denied'
            }
        );
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Invalid token format');
    }

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
}
