"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let paramsOrder = [
    (0, express_validator_1.check)('order_delivery_date').isISO8601().toDate(),
    (0, express_validator_1.check)('status').isLength({ min: 1, max: 20 }),
    (0, express_validator_1.check)('products').isArray()
];
function validatorParams(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
exports.default = {
    paramsOrder,
    validatorParams
};
