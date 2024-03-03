"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_token_1 = require("../middlewares/auth-token");
const validator_params_1 = __importDefault(require("../middlewares/validator-params"));
const updateProfile_controller_1 = require("../controllers/updateProfile-controller");
const deleteProfileData_controller_1 = require("../controllers/deleteProfileData-controller");
const router = (0, express_1.Router)();
// rutas para actualizar datos o eliminarlos
router.route("/socialRed")
    .post(auth_token_1.verifyToken, updateProfile_controller_1.addSocialRed)
    .patch()
    .delete(auth_token_1.verifyToken, updateProfile_controller_1.deleteSocialRed)
    .get(auth_token_1.verifyToken, updateProfile_controller_1.getSocialRed);
router.route("/socialRed/:id")
    .get(auth_token_1.verifyToken, updateProfile_controller_1.getSocialRedByCompany);
router.route('/company')
    .patch(auth_token_1.verifyToken, validator_params_1.default.paramsCompany, validator_params_1.default.validatorParams, updateProfile_controller_1.patchCompany)
    .delete(auth_token_1.verifyToken, deleteProfileData_controller_1.deleteDataProfile);
// .post(verifyToken, addSocialRed)
// .get(verifyToken, getSocialRed)
router.route('/provider')
    .patch(auth_token_1.verifyToken, validator_params_1.default.paramsProvider, validator_params_1.default.validatorParams, updateProfile_controller_1.patchProvider)
    .delete(auth_token_1.verifyToken, deleteProfileData_controller_1.deleteDataProfile);
router.route('/grocer')
    .patch(auth_token_1.verifyToken, validator_params_1.default.paramsGrocer, validator_params_1.default.validatorParams, updateProfile_controller_1.patchGrocer)
    .delete(auth_token_1.verifyToken, deleteProfileData_controller_1.deleteDataProfile);
// ruta para ver los datos actualizados después de efectuar un cambio, para fines de prueba
router.route('/dataProfile')
    .get(auth_token_1.verifyToken, updateProfile_controller_1.getData);
// router.route('/example')
//     .post(verifyToken, example)
//     .delete(verifyToken, example);
// // rutas para actualizar imagen
// router.route('/photoProfile/company')
//     .patch(upload.single('profile_photo_company'), verifyToken, patchPhotoCompany)
// router.route('/photoCover/company')
//     .patch(upload.single('cover_photo_company'), verifyToken, patchPhotoCompany)
// router.route('/photoProfile/provider')
//     .patch(upload.single('profile_photo_provider'), verifyToken, patchPhotoProvider)
// router.route('/photoProfile/grocer')
//     .patch(upload.single('profile_photo_grocer'), verifyToken, patchPhotoGrocer)
// router.route('/photoCover/grocer')
//     .patch(upload.single('cover_photo_grocer'), verifyToken, patchPhotoGrocer)
// // ruta para cambiar la contraseña
// router.post('/changePassword/company', verifyToken, validator.paramsPassword, validator.validatorParams, changePasswordCompany)
// router.post('/changePassword/provider', verifyToken, validator.paramsPassword, validator.validatorParams, changePasswordProvider)
// router.post('/changePassword/grocer', verifyToken, validator.paramsPassword, validator.validatorParams, changePasswordGrocer)
exports.default = router;
