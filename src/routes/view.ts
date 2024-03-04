import { Router } from "express"
import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import { get_view_companies, get_view_grocers, get_view_price_products, get_view_products } from "../controllers/view-controller";

const router = Router();

router.post('/grocers', verifyToken, validateRole(['provider']), get_view_grocers);
router.get('/companies', get_view_companies);
router.get('/products', get_view_products);
router.get('/price/products', verifyToken, validateRole(['grocer']), get_view_price_products);



export default router;