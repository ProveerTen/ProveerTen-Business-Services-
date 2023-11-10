// import { verify } from 'jsonwebtoken';

// console.log(process.env.LOCAL_KEY);
// const jwtAuth = (req: Request, res: Response, next: NextFunction) => {

//     const tokenAuth: string | undefined = req.header('Authorization');

//     if (!tokenAuth) {
//         res.status(403).send({ auth: false, message: 'No token provided' })
//     }

//     let token: string = tokenAuth!.split('')[1];

//     console.log({ token });



//     // verify(token, process.env.LOCAL_KEY);

// };

import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import 'dotenv/config';

const jwtAuth: any = (req: Request, res: Response, next: NextFunction) => {

    const tokenAuth: string | undefined = req.header('Authorization');

    if (!tokenAuth) {
        res.status(403).send({ auth: false, message: 'No token provided' })
    }

    // let token: string = tokenAuth!.split('')[1];
    let token: string = 'asdasdasdasdasd';

    console.log({ token });

    jwt.verify(token, process.env.LOCAL_KEY, (err: any, decoded: any) => {
        console.log("Decoded", decoded, "token", token, "key", process.env.LOCAL_KEY);
        if (err) {
            console.log(err);
            return res.status(400).send({ auth: false, message: 'Failed to authenticate token' });
        }

        console.log(decoded.email);
        console.log(decoded.rol);

        next();
    });
}

export default { jwtAuth };