"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.dataDecoded = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const tokenAuth = req.header('Authorization');
        if (!tokenAuth) {
            return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
        }
        console.log(tokenAuth);
        let token = tokenAuth.split(' ')[1];
        let secretKey = process.env.SECRET_KEY;
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log("error", err);
                return res.status(401).json({ auth: false, message: 'Error authenticating token' });
            }
            if (decoded) {
                const { email, role, id } = decoded;
                exports.dataDecoded = {
                    email,
                    role,
                    id
                };
                next();
            }
            else {
                return res.status(401).json({ auth: false, message: 'Invalid Token' });
            }
        });
    }
    catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "failed to authenticate": error });
    }
};
exports.verifyToken = verifyToken;
