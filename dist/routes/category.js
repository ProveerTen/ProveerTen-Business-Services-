"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_role_1 = require("../middlewares/auth-role");
const auth_token_1 = require("../middlewares/auth-token");
const category_controller_1 = require("../controllers/category-controller");
const category_validator_1 = __importDefault(require("../middlewares/category-validator"));
const router = (0, express_1.Router)();
router.post('/create', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), category_validator_1.default.paramsCategory, category_validator_1.default.validatorParams, category_controller_1.createCategory);
router.get('/categories', category_controller_1.get_categories);
exports.default = router;
