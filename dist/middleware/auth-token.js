"use strict";
// import { verify } from 'jsonwebtoken';
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
require("dotenv/config");
const jwtAuth = (req, res, next) => {
    const tokenAuth = req.header('Authorization');
    if (!tokenAuth) {
        res.status(403).send({ auth: false, message: 'No token provided' });
    }
    // let token: string = tokenAuth!.split('')[1];
    let token = 'asdasdasdasdasd';
    console.log({ token });
    jwt.verify(token, process.env.LOCAL_KEY, (err, decoded) => {
        console.log("Decoded", decoded, "token", token, "key", process.env.LOCAL_KEY);
        if (err) {
            console.log(err);
            return res.status(400).send({ auth: false, message: 'Failed to authenticate token' });
        }
        console.log(decoded.email);
        console.log(decoded.rol);
        next();
    });
};
exports.default = { jwtAuth };
