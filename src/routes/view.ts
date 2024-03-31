import { Router } from "express"
import { validateRole } from "../middlewares/auth-role";
import { verifyToken } from "../middlewares/auth-token";
import { companies_by_location, get_neighborhood_by_location, get_view_companies, get_view_grocers, get_view_price_products, get_view_products, get_view_subCategories, products_by_location } from "../controllers/view-controller";

const router = Router();

router.post('/grocers', verifyToken, validateRole(['provider']), get_view_grocers);
router.post('/companies', get_view_companies);
router.post('/products', get_view_products);
router.post('/companies/location', companies_by_location);
router.post('/products/location', products_by_location);
router.post('/subCategories', get_view_subCategories);
router.post('/price/products', verifyToken, validateRole(['grocer']), get_view_price_products);
router.post('/grocers/neighborhood', verifyToken, validateRole(['provider']), get_neighborhood_by_location);

export default router;