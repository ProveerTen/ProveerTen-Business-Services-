"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_provider_controller_1 = require("../controllers/update-provider-controller");
const auth_token_1 = require("../middlewares/auth-token");
const validate_role_validator_1 = require("../middlewares/validate-role-validator");
const router = (0, express_1.Router)();
router.post('/update/:document', auth_token_1.verifyToken, validate_role_validator_1.validateCompany, update_provider_controller_1.updateProvider);
exports.default = router;
