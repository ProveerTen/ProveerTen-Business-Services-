"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_validator_1 = require("../middlewares/delete-validator");
const delete_provider_controller_1 = require("../controllers/delete-provider-controller");
const router = (0, express_1.Router)();
router.post('/delete/:document', delete_validator_1.authJwt, delete_provider_controller_1.deleteProvider);
exports.default = router;
