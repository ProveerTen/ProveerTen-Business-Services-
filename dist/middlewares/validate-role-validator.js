"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGrocer = exports.validateProvider = exports.validateCompany = void 0;
const auth_token_1 = require("./auth-token");
const validateCompany = (req, res, next) => {
    if (auth_token_1.dataDecoded.role === 'company') {
        next();
    }
    else {
        return res.status(401).json({ auth: false, message: 'Invalid role company' });
    }
};
exports.validateCompany = validateCompany;
const validateProvider = (req, res, next) => {
    if (auth_token_1.dataDecoded.role === 'provider') {
        next();
    }
    else {
        return res.status(401).json({ auth: false, message: 'Invalid role provider' });
    }
};
exports.validateProvider = validateProvider;
const validateGrocer = (req, res, next) => {
    if (auth_token_1.dataDecoded.role === 'grocer') {
        next();
    }
    else {
        return res.status(401).json({ auth: false, message: 'Invalid role grocer' });
    }
};
exports.validateGrocer = validateGrocer;
