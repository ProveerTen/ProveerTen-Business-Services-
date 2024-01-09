"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let paramsUpdateProvider = [
    (0, express_validator_1.check)('document_provider').isLength({ min: 7, max: 10 }),
    (0, express_validator_1.check)('name_provider').isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('last_name_provider').isLength({ min: 1, max: 40 }),
    (0, express_validator_1.check)('email_provider').isEmail(),
    (0, express_validator_1.check)('password_provider').isLength({ min: 1, max: 40 }),
    (0, express_validator_1.check)('nit_company').isLength({ min: 1, max: 15 }),
    (0, express_validator_1.check)('city_provider').isLength({ min: 1, max: 25 }),
    (0, express_validator_1.check)('neighborhood').isLength({ min: 1, max: 40 }),
    (0, express_validator_1.check)('street').isLength({ min: 1, max: 30 }),
    (0, express_validator_1.check)('number_street').isLength({ min: 1, max: 25 }),
    (0, express_validator_1.check)('number_provider').isLength({ min: 1, max: 15 }),
];
function validatorParams(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
exports.default = paramsUpdateProvider;
validatorParams;
