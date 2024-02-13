"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile-controller");
const auth_token_1 = require("../middlewares/auth-token");
const auth_role_1 = require("../middlewares/auth-role");
const router = (0, express_1.Router)();
router.get('/company', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), profile_controller_1.company);
router.get('/provider', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['provider']), profile_controller_1.provider);
router.get('/grocer', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer']), profile_controller_1.grocer);
router.get('/companies/:id', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer', 'provider']), profile_controller_1.companies);
router.get('/companiesUserCero/:id', profile_controller_1.companies);
router.get('/providers/:id', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer', 'company']), profile_controller_1.providers);
router.get('/grocers/:id', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company', 'provider']), profile_controller_1.grocers);
router.get('/allCompanies', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer']), profile_controller_1.allCompanies); //
// router.get('/allCompaniesUserCero', validateRole(['']), allCompanies) // para usuario cero
router.get('/allCompaniesUserCero', profile_controller_1.allCompanies); //
exports.default = router;
