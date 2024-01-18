import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

let paramsUpdateProvider: any = [
    check('document_provider').isLength({ min: 7, max: 10 }),
    check('name_provider').isLength({ min: 1, max: 50 }),
    check('last_name_provider').isLength({ min: 1, max: 40 }),
    check('email_provider').isEmail(),
    check('password_provider').isLength({ min: 1, max: 40 }),
    check('nit_company').isLength({ min: 1, max: 15 }),
    check('city_provider').isLength({ min: 1, max: 25 }),
    check('neighborhood').isLength({ min: 1, max: 40 }),
    check('street').isLength({ min: 1, max: 30 }),
    check('number_street').isLength({ min: 1, max: 25 }),
    check('number_provider').isLength({ min: 1, max: 15 }),
];

function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default paramsUpdateProvider
validatorParams;
