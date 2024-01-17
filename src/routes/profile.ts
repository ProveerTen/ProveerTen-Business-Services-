import { Router } from "express"

import { company, provider, grocer, companies, providers, grocers } from '../controllers/profile-controller'
import { verifyToken } from '../middlewares/auth-token';
import { validateRole } from "../middlewares/auth-role";

const router = Router();

router.get('/company', verifyToken, validateRole(['company']), company);
router.get('/provider', verifyToken, validateRole(['provider']), provider);
router.get('/grocer', verifyToken, validateRole(['grocer']), grocer);

router.get('/companies/:id', verifyToken, validateRole(['grocer', 'provider']), companies);
router.get('/providers/:id', verifyToken, validateRole(['grocer', 'company']), providers);
router.get('/grocers/:id', verifyToken, validateRole(['company', 'provider']), grocers);

export default router;
