"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_provider_controller_1 = require("../controllers/update-provider-controller");
const auth_token_1 = require("../middlewares/auth-token");
const auth_role_1 = require("../middlewares/auth-role");
const validator_params_1 = __importDefault(require("../middlewares/validator-params"));
const delete_provider_controller_1 = require("../controllers/delete-provider-controller");
const router = (0, express_1.Router)();
router.post('/update', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), validator_params_1.default.paramsProvider, validator_params_1.default.validatorParams, update_provider_controller_1.updateProvider);
router.post('/update/password', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), update_provider_controller_1.updateProviderPassword);
router.post('/delete/:document', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), delete_provider_controller_1.deleteProvider);
exports.default = router;
