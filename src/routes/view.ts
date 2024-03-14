import { Router } from "express"
import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import { companies_by_location, get_view_companies, get_view_grocers, get_view_price_products, get_view_products, products_by_location } from "../controllers/view-controller";

const router = Router();

router.post('/grocers', verifyToken, validateRole(['provider']), get_view_grocers);
router.post('/companies', get_view_companies);
router.post('/products', get_view_products);
router.post('/companies/location', companies_by_location);
router.post('/products/location', products_by_location);
router.post('/price/products', verifyToken, validateRole(['grocer']), get_view_price_products);

export default router;