"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const auth_token_1 = require("./auth-token");
// export const validateRole = (role: string,) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         if (role === dataDecoded.role) {
//             next();
//         } else {
//             return res.status(401).json({ auth: false, message: `Invalid role ${role}` });
//         }
//     }
// } 
const validateRole = (requiredRoles = []) => {
    return (req, res, next) => {
        const userRole = auth_token_1.dataDecoded.role;
        if (requiredRoles.length === 0 || requiredRoles.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).json({ auth: false, message: `Invalid role. Required roles: ${requiredRoles.join(', ')}` });
        }
    };
};
exports.validateRole = validateRole;
