"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_token_1 = require("../middlewares/auth-token");
const updatePhotosProfile_controller_1 = require("../controllers/updatePhotosProfile-controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads' });
// rutas para actualizar imagen
router.route('/photoProfile/company')
    .patch(upload.single('profile_photo_company'), auth_token_1.verifyToken, updatePhotosProfile_controller_1.patchPhotoCompany);
router.route('/photoCover/company')
    .patch(upload.single('cover_photo_company'), auth_token_1.verifyToken, updatePhotosProfile_controller_1.patchPhotoCompany);
router.route('/photoProfile/provider')
    .patch(upload.single('profile_photo_provider'), auth_token_1.verifyToken, updatePhotosProfile_controller_1.patchPhotoProvider);
router.route('/photoProfile/grocer')
    .patch(upload.single('profile_photo_grocer'), auth_token_1.verifyToken, updatePhotosProfile_controller_1.patchPhotoGrocer);
router.route('/photoCover/grocer')
    .patch(upload.single('cover_photo_grocer'), auth_token_1.verifyToken, updatePhotosProfile_controller_1.patchPhotoGrocer);
exports.default = router;
