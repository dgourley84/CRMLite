import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ENV from '../utils/jwtConfig.js';

/** auth middleware */
export default async function Auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send();
    }
}


export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
}
