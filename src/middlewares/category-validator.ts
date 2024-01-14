import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator';

let paramsCategory: any = [
    check('name_category').isLength({ min: 2, max: 50 })
]

function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default {
    paramsCategory,
    validatorParams
}