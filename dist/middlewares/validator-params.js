"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let paramsCompany = [
    (0, express_validator_1.check)('name_company').isLength({ min: 1, max: 100 }).optional(),
    (0, express_validator_1.check)('email_company').isEmail().optional(),
    (0, express_validator_1.check)('national_line_company').isLength({ min: 1, max: 20 }).optional(),
    (0, express_validator_1.check)('foundation_company').isLength({ max: 40 }).optional(),
    (0, express_validator_1.check)('description_company').isLength({ max: 255 }).optional(),
];
let paramsProvider = [
    (0, express_validator_1.check)('name_provider').isLength({ min: 1, max: 50 }).optional(),
    (0, express_validator_1.check)('last_name_provider').isLength({ min: 1, max: 40 }).optional(),
    (0, express_validator_1.check)('email_provider').isEmail().optional(),
    (0, express_validator_1.check)('city_provider').isLength({ min: 1, max: 25 }).optional(),
    (0, express_validator_1.check)('neighborhood').isLength({ min: 1, max: 40 }).optional(),
    (0, express_validator_1.check)('street').isLength({ min: 1, max: 30 }).optional(),
    (0, express_validator_1.check)('number_street').isLength({ min: 1, max: 25 }).optional(),
    (0, express_validator_1.check)('number_provider').isLength({ min: 1, max: 15 }).optional(),
];
let paramsGrocer = [
    (0, express_validator_1.check)('name_grocer').isLength({ min: 1, max: 40 }).optional(),
    (0, express_validator_1.check)('last_name_grocer').isLength({ min: 1, max: 40 }).optional(),
    (0, express_validator_1.check)('email_grocer').isEmail().optional(),
    (0, express_validator_1.check)('name_store').isLength({ min: 1, max: 50 }).optional(),
    (0, express_validator_1.check)('city_grocer').isLength({ min: 1, max: 25 }).optional(),
    (0, express_validator_1.check)('neighborhood').isLength({ min: 4, max: 40 }).optional().withMessage("El barrio ingresado no cumple"),
    (0, express_validator_1.check)('street').isLength({ min: 1, max: 30 }).optional(),
    (0, express_validator_1.check)('number_street').isLength({ min: 1, max: 25 }).optional(),
    (0, express_validator_1.check)('apartment').isLength({ max: 25 }).optional(),
    (0, express_validator_1.check)('number_grocer').isLength({ min: 1, max: 15 }).optional(),
];
let paramsPassword = [
    (0, express_validator_1.check)('new_password').isLength({ min: 8, max: 20 }).optional(),
];
function validatorParams(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
exports.default = {
    paramsProvider,
    paramsGrocer,
    paramsCompany,
    paramsPassword,
    validatorParams
};
