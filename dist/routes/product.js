"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../libs/multer"));
const auth_role_1 = require("../middlewares/auth-role");
const product_controller_1 = require("../controllers/product-controller");
const auth_token_1 = require("../middlewares/auth-token");
const product_validator_1 = __importDefault(require("../middlewares/product-validator"));
const router = (0, express_1.Router)();
router.post('/create', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), multer_1.default.single('image_product'), product_validator_1.default.paramsProduct, product_validator_1.default.validatorParams, product_controller_1.createProduct);
router.post('/update', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), multer_1.default.single('image_product'), product_validator_1.default.paramsProductUpdate, product_validator_1.default.validatorParams, product_controller_1.updateProduct);
router.post('/delete', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), product_controller_1.deleteProduct);
router.post('/price', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer']), product_controller_1.suggest_product_price);
exports.default = router;
