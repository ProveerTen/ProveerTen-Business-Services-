import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator';

let paramsProduct: any = [
    check('name_product').isLength({ min: 1, max: 20 }),
    check('description_product').isLength({ min: 1, max: 80 }),
    check('purchase_price_product').isNumeric(),
    check('unit_purchase_price_product').isNumeric(),
    check('suggested_unit_selling_price_product').isNumeric(),
    check('purchase_quantity').isNumeric(),
    check('stock_product').isNumeric(),
    check('content_product').isLength({ min: 1, max: 50 }),
    check('availability_product').isLength({ min: 1, max: 15 })
];



let paramsProductUpdate: any = [
    check ('id_product').isLength ({min : 1, max: 5}),
    check('name_product').isLength({ min: 1, max: 20 }),
    check('description_product').isLength({ min: 1, max: 80 }),
    check('purchase_price_product').isNumeric(),
    check('unit_purchase_price_product').isNumeric(),
    check('suggested_unit_selling_price_product').isNumeric(),
    check('purchase_quantity').isNumeric(),
    check('stock_product').isNumeric(),
    check('content_product').isLength({ min: 1, max: 50 }),
    check('availability_product').isLength({ min: 1, max: 15 })
]

function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default {
    paramsProduct,
    paramsProductUpdate,
    validatorParams
}