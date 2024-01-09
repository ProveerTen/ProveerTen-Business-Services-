"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_ = "company";
const authJwt = (req, res, next) => {
    try {
        const tokenAuth = req.header("Authorization");
        if (!tokenAuth) {
            return res.status(403).json({ error: "Token no proporcionado" });
        }
        let secret_key = process.env.SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(tokenAuth, secret_key);
        const exp = decoded;
        const expirationDate = new Date(exp * 1000);
        if (expirationDate < new Date()) {
            console.log("Token expirado");
            return res.status(400).json({ message: "El token ha expirado" });
        }
        const { role } = decoded;
        if (role === role_) {
            console.log("entra");
            console.log(role);
            next();
        }
        else {
            return res.status(400).json({ message: "Rol no permitido" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.authJwt = authJwt;
exports.default = exports.authJwt;
