import { Request, Response, NextFunction } from 'express';

import { dataDecoded } from './auth-token';

// export const validateRole = (role: string,) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         if (role === dataDecoded.role) {
//             next();
//         } else {
//             return res.status(401).json({ auth: false, message: `Invalid role ${role}` });
//         }
//     }
// } 

export const validateRole = (requiredRoles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = dataDecoded.role;

        if (requiredRoles.length === 0 || requiredRoles.includes(userRole)) {
            next();
        } else {
            return res.status(401).json({ auth: false, message: `Invalid role. Required roles: ${requiredRoles.join(', ')}` });
        }
    };
};
