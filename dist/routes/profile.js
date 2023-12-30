"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile-controller");
const router = (0, express_1.Router)();
router.post('/company', profile_controller_1.company);
router.post('/provider', profile_controller_1.provider);
router.post('/grocer', profile_controller_1.grocer);
exports.default = router;
