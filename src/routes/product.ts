import { Router } from "express"
import multer from '../libs/multer';

import { verifyToken } from "../middlewares/auth-token";
import { validateRole } from "../middlewares/auth-role";
import validator from '../middlewares/product-validator';

import { createProduct, deleteProduct } from "../controllers/product-controller";


const router = Router();

router.post('/create', verifyToken, validateRole(['company']), multer.single('image_product'), validator.paramsProduct, validator.validatorParams, createProduct);

router.post('/delete', verifyToken, validateRole(['company']), deleteProduct)

export default router;