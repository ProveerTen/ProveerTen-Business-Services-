import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { DecodedToken } from '../models/decoded-token';

export let dataDecoded: DecodedToken;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const tokenAuth = req.header('Authorization');

        if (!tokenAuth) {
            return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
        }

        let token = tokenAuth.split(' ')[1];

        let secretKey = process.env.SECRET_KEY

        jwt.verify(token, secretKey!, (err: VerifyErrors | null, decoded) => {
            if (err) {
                console.log("Error: ", err);
                return res.status(401).json({ auth: false, message: 'Error al autenticar el token' });
            }

            if (decoded) {
                const { email, role, id } = decoded as DecodedToken;

                dataDecoded = {
                    email,
                    role,
                    id
                }
                console.log("AUTH TOKEN", email, role, id);
                
                next();

            } else {
                return res.status(401).json({ auth: false, message: 'Token inválido' });
            }
        });

    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ "failed to authenticate": error });
    }
};