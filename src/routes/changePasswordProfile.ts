import { Router } from "express";

import { verifyToken } from "../middlewares/auth-token";
import validator from '../middlewares/validator-params';
import { changePasswordCompany, changePasswordProvider, changePasswordGrocer } from "../controllers/changePassword-controller";

const router = Router();


// rutas para cambiar la contraseña
router.post('/changePassword/company', verifyToken, validator.paramsPassword, validator.validatorParams, changePasswordCompany)

router.post('/changePassword/provider', verifyToken, validator.paramsPassword, validator.validatorParams, changePasswordProvider)

router.post('/changePassword/grocer', verifyToken, validator.paramsPassword, validator.validatorParams, changePasswordGrocer)

export default router;