import { Router } from "express";
import { getProductsByName, getCompaniesByName, getProductsByCategories, getCompaniesByCategories } from '../controllers/search-controller';

const router = Router();

router.post('/products/value', getProductsByName);
router.post('/products/categories', getProductsByCategories);
router.post('/companies/value', getCompaniesByName);
router.post('/companies/categories', getCompaniesByCategories);

export default router;