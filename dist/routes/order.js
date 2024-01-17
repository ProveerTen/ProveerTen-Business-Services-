"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_role_1 = require("../middlewares/auth-role");
const auth_token_1 = require("../middlewares/auth-token");
const order_controller_1 = require("../controllers/order-controller");
const order_validator_1 = __importDefault(require("../middlewares/order-validator"));
const router = (0, express_1.Router)();
router.post('/create', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer']), order_validator_1.default.paramsOrder, order_validator_1.default.validatorParams, order_controller_1.createOrder);
router.get('/companies', order_controller_1.companies);
router.post('/products', order_controller_1.products);
router.post('/providers', order_controller_1.providers);
exports.default = router;
