import { Request, Response, NextFunction } from 'express';
import { dataDecoded } from './auth-token';

export const validateCompany = (req: Request, res: Response, next: NextFunction) => {
    if (dataDecoded.role === 'company') {
        next();
    } else {
        return res.status(401).json({ auth: false, message: 'Invalid role company' });
    }
}

export const validateProvider = (req: Request, res: Response, next: NextFunction) => {
    if (dataDecoded.role === 'provider') {
        next();
    } else {
        return res.status(401).json({ auth: false, message: 'Invalid role provider' });
    }
}

export const validateGrocer = (req: Request, res: Response, next: NextFunction) => {
    if (dataDecoded.role === 'grocer') {
        next();
    } else {
        return res.status(401).json({ auth: false, message: 'Invalid role grocer' });
    }
}