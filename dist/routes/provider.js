"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_provider_controller_1 = require("../controllers/update-provider-controller");
const auth_token_1 = require("../middlewares/auth-token");
const auth_role_1 = require("../middlewares/auth-role");
const router = (0, express_1.Router)();
router.post('/update/:document', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), update_provider_controller_1.updateProvider);
exports.default = router;
