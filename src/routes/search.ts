import { Router } from "express";
import { getProductsByName, getProductsByCategories } from '../controllers/search-controller';

const router = Router();

router.post('/value', getProductsByName);
router.get('/categories', getProductsByCategories);

export default router;