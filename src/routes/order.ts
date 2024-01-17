import { Router } from "express"
import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import { companies, createOrder, products, providers } from "../controllers/order-controller";
import validator from '../middlewares/order-validator';



const router = Router();

router.post('/create', verifyToken, validateRole(['grocer']),validator.paramsOrder,validator.validatorParams,createOrder);
router.get('/companies',companies);
router.post('/products',products);
router.post('/providers',providers);


export default router;