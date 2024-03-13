    import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator';

let paramsOrder: any = [
    check('order_delivery_date').isISO8601().toDate(),
    check('status').isLength({ min: 1, max: 20 }),
    check('products').isArray()
]

function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default {
    paramsOrder,
    validatorParams
}