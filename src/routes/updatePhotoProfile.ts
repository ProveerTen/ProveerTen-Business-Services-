import { Router } from "express";
import multer from 'multer';

import { verifyToken } from "../middlewares/auth-token";
import { patchPhotoCompany, patchPhotoProvider, patchPhotoGrocer } from "../controllers/updatePhotosProfile-controller";

const router = Router();
const upload = multer({ dest: 'uploads' })


// rutas para actualizar imagen
router.route('/photoProfile/company')
    .patch(upload.single('profile_photo_company'), verifyToken, patchPhotoCompany)

router.route('/photoCover/company')
    .patch(upload.single('cover_photo_company'), verifyToken, patchPhotoCompany)

router.route('/photoProfile/provider')
    .patch(upload.single('profile_photo_provider'), verifyToken, patchPhotoProvider)

router.route('/photoProfile/grocer')
    .patch(upload.single('profile_photo_grocer'), verifyToken, patchPhotoGrocer)

router.route('/photoCover/grocer')
    .patch(upload.single('cover_photo_grocer'), verifyToken, patchPhotoGrocer)

export default router;