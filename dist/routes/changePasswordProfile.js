"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_token_1 = require("../middlewares/auth-token");
const validator_params_1 = __importDefault(require("../middlewares/validator-params"));
const changePassword_controller_1 = require("../controllers/changePassword-controller");
const router = (0, express_1.Router)();
// rutas para cambiar la contraseña
router.post('/changePassword/company', auth_token_1.verifyToken, validator_params_1.default.paramsPassword, validator_params_1.default.validatorParams, changePassword_controller_1.changePasswordCompany);
router.post('/changePassword/provider', auth_token_1.verifyToken, validator_params_1.default.paramsPassword, validator_params_1.default.validatorParams, changePassword_controller_1.changePasswordProvider);
router.post('/changePassword/grocer', auth_token_1.verifyToken, validator_params_1.default.paramsPassword, validator_params_1.default.validatorParams, changePassword_controller_1.changePasswordGrocer);
exports.default = router;
