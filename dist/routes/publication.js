"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_controller_1 = require("../controllers/publication-controller");
const multer_1 = __importDefault(require("../libs/multer"));
const auth_token_1 = require("../middlewares/auth-token");
const auth_role_1 = require("../middlewares/auth-role");
const router = (0, express_1.Router)();
router.post('/create', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), multer_1.default.single('image'), publication_controller_1.createPublication);
router.delete('/delete/:id', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), publication_controller_1.deleteOnePublication);
router.get('/view/', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['grocer']), publication_controller_1.getAllPublications); //
router.get('/viewUserCero/', publication_controller_1.getAllPublications); // para usuario cero
// router.get('/view/', getAllPublications); //
router.get('/view/:id', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), publication_controller_1.getPublicationById);
router.get('/view/company/:id', auth_token_1.verifyToken, publication_controller_1.getPublicationsByCompany);
router.get('/viewUserCero/company/:id', publication_controller_1.getPublicationsByCompany); // para usuario cero
router.patch('/update', auth_token_1.verifyToken, (0, auth_role_1.validateRole)(['company']), multer_1.default.single('image'), publication_controller_1.updateDataPublication);
exports.default = router;
