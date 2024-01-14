import { Router } from "express"

import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import { createCategory, get_categories } from "../controllers/category-controller";
import validator from "../middlewares/category-validator";

const router = Router();

router.post('/create', verifyToken, validateRole(['company']), validator.paramsCategory, validator.validatorParams, createCategory);
router.get('/categories', get_categories);

export default router;