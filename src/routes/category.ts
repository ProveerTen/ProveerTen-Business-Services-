import { Router } from "express"

import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import validator from "../middlewares/category-validator";
import { createCategory, get_categories /*, deleteCategory*/ } from "../controllers/category-controller";

const router = Router();

router.post('/create', verifyToken, validateRole(['company']), validator.paramsCategory, validator.validatorParams, createCategory);
router.get('/categories', verifyToken, validateRole(['company']), get_categories);
// router.post('/delete', verifyToken, validateRole(['company']), deleteCategory)
export default router;