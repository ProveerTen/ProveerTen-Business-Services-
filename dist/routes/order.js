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
router.post('/delete', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company', 'provider']), order_controller_1.deleteOrder);
router.get('/companies', auth_token_1.verifyToken, order_controller_1.companies); //
router.post('/products', auth_token_1.verifyToken, order_controller_1.products);
router.post('/providers', auth_token_1.verifyToken, order_controller_1.providers);
router.post('/addproducts', auth_token_1.verifyToken, order_controller_1.orderandproducts);
router.get('/grocer', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer']), order_controller_1.orders_grocer);
router.get('/company', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), order_controller_1.orders_company);
router.get('/provider', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['provider']), order_controller_1.orders_provider);
router.post('/detail', auth_token_1.verifyToken, order_controller_1.orders_details);
exports.default = router;
