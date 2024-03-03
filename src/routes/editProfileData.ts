import { Router } from "express";

import { verifyToken } from "../middlewares/auth-token";
import validator from '../middlewares/validator-params';

import { patchCompany, patchProvider, patchGrocer, getData, addSocialRed, getSocialRed, deleteSocialRed, getSocialRedByCompany } from "../controllers/updateProfile-controller";
import { deleteDataProfile } from "../controllers/deleteProfileData-controller";

const router = Router();


// rutas para actualizar datos o eliminarlos
router.route("/socialRed")
    .post(verifyToken, addSocialRed)
    .patch()
    .delete(verifyToken, deleteSocialRed)
    .get(verifyToken, getSocialRed)

router.route("/socialRed/:id")
    .get(verifyToken, getSocialRedByCompany)

router.route('/company')
    .patch(verifyToken, validator.paramsCompany, validator.validatorParams, patchCompany)
    .delete(verifyToken, deleteDataProfile)

    // .post(verifyToken, addSocialRed)
    // .get(verifyToken, getSocialRed)

router.route('/provider')
    .patch(verifyToken, validator.paramsProvider, validator.validatorParams, patchProvider)
    .delete(verifyToken, deleteDataProfile)

router.route('/grocer')
    .patch(verifyToken, validator.paramsGrocer, validator.validatorParams, patchGrocer)
    .delete(verifyToken, deleteDataProfile);


// ruta para ver los datos actualizados después de efectuar un cambio, para fines de prueba
router.route('/dataProfile')
    .get(verifyToken, getData);

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

export default router;