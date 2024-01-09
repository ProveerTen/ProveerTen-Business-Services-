"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_validator_1 = __importDefault(require("../middlewares/provider/jwt-validator"));
const update_provider_controller_1 = require("../controllers/provider/update-provider-controller");
const router = (0, express_1.Router)();
router.post('/update/:document', jwt_validator_1.default, update_provider_controller_1.updateProvider);
exports.default = router;
