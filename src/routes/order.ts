import { Router } from "express"
import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import { companies, createOrder, deleteOrder, orderandproducts, orders_company, orders_details, orders_grocer, orders_provider, products, providers } from "../controllers/order-controller";
import validator from '../middlewares/order-validator';



const router = Router();

router.post('/create', verifyToken, validateRole(['grocer']),validator.paramsOrder,validator.validatorParams,createOrder);
router.post('/delete',verifyToken, validateRole(['company','provider']), deleteOrder);
router.get('/companies',verifyToken,companies);
router.post('/products',verifyToken,products);
router.post('/providers',verifyToken,providers);

router.post('/addproducts',verifyToken,orderandproducts);

router.get('/grocer',verifyToken,validateRole(['grocer']),orders_grocer);
router.get('/company',verifyToken,validateRole(['company']),orders_company);
router.get('/provider',verifyToken,validateRole(['provider']),orders_provider);
router.post('/detail',verifyToken,orders_details);



export default router;