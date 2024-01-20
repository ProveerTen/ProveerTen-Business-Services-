"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let paramsProduct = [
    (0, express_validator_1.check)('name_product').isLength({ min: 1, max: 20 }),
    (0, express_validator_1.check)('description_product').isLength({ min: 1, max: 80 }),
    (0, express_validator_1.check)('purchase_price_product').isNumeric(),
    (0, express_validator_1.check)('unit_purchase_price_product').isNumeric(),
    (0, express_validator_1.check)('suggested_unit_selling_price_product').isNumeric(),
    (0, express_validator_1.check)('purchase_quantity').isNumeric(),
    (0, express_validator_1.check)('stock_product').isNumeric(),
    (0, express_validator_1.check)('content_product').isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('availability_product').isLength({ min: 1, max: 15 })
];
let paramsProductUpdate = [
    (0, express_validator_1.check)('id_product').isLength({ min: 1, max: 5 }),
    (0, express_validator_1.check)('name_product').isLength({ min: 1, max: 20 }),
    (0, express_validator_1.check)('description_product').isLength({ min: 1, max: 80 }),
    (0, express_validator_1.check)('purchase_price_product').isNumeric(),
    (0, express_validator_1.check)('unit_purchase_price_product').isNumeric(),
    (0, express_validator_1.check)('suggested_unit_selling_price_product').isNumeric(),
    (0, express_validator_1.check)('purchase_quantity').isNumeric(),
    (0, express_validator_1.check)('stock_product').isNumeric(),
    (0, express_validator_1.check)('content_product').isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('availability_product').isLength({ min: 1, max: 15 })
];
function validatorParams(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
exports.default = {
    paramsProduct,
    paramsProductUpdate,
    validatorParams
};
