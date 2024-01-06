import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

let paramsCompany: any = [
    check('name_company').isLength({ min: 1, max: 100 }).optional(),
    check('email_company').isEmail().optional(),
    check('national_line_company').isLength({ min: 1, max: 20 }).optional(),
    check('foundation_company').isLength({ min: 1, max: 40 }).optional(),
    check('description_company').isLength({ max: 255 }).optional(),
];


let paramsProvider: any = [
    check('name_provider').isLength({ min: 1, max: 50 }).optional(),
    check('last_name_provider').isLength({ min: 1, max: 40 }).optional(),
    check('email_provider').isEmail().optional(),
    check('city_provider').isLength({ min: 1, max: 25 }).optional(),
    check('neighborhood').isLength({ min: 1, max: 40 }).optional(),
    check('street').isLength({ min: 1, max: 30 }).optional(),
    check('number_street').isLength({ min: 1, max: 25 }).optional(),
    check('number_provider').isLength({ min: 1, max: 15 }).optional(),
];


let paramsGrocer: any = [
    check('name_grocer').isLength({ min: 1, max: 40 }).optional(),
    check('last_name_grocer').isLength({ min: 1, max: 40 }).optional(),
    check('email_grocer').isEmail().optional(),
    check('name_store').isLength({ min: 1, max: 50 }).optional(),
    check('city_grocer').isLength({ min: 1, max: 25 }).optional(),
    check('neighborhood').isLength({ min: 4, max: 40 }).optional(),    
    check('street').isLength({ min: 1, max: 30 }).optional(),
    check('number_street').isLength({ min: 1, max: 25 }).optional(),
    check('apartment').isLength({ max: 25 }).optional(),
    check('number_grocer').isLength({ min: 1, max: 15 }).optional(),
];


let paramsPassword: any = [
    check('new_password').isLength({ min: 8, max: 20 }).optional(),
];


function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default {
    paramsProvider,
    paramsGrocer,
    paramsCompany,
    paramsPassword,
    validatorParams
}