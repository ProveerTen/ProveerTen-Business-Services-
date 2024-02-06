import { Router } from "express";
import { updateProvider, updateProviderPassword } from "../controllers/update-provider-controller";
import { verifyToken } from "../middlewares/auth-token";
import { validateRole } from "../middlewares/auth-role";
import validator from '../middlewares/validator-params';

const router = Router();
router.post('/update', verifyToken, validateRole(['company']), validator.paramsProvider, validator.validatorParams, updateProvider);
router.post('/update/password', verifyToken, validateRole(['company']), updateProviderPassword);

export default router;


