import { Router } from "express";
import { updateProvider } from "../controllers/update-provider-controller";
import { verifyToken }from "../middlewares/auth-token";
import { validateCompany } from "../middlewares/validate-role-validator";

 
const router  = Router();
router.post('/update/:document',verifyToken, validateCompany, updateProvider);

export default router;


