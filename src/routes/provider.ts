import { Router } from "express";
import { updateProvider } from "../controllers/update-provider-controller";
import { verifyToken }from "../middlewares/auth-token";
import { validateRole } from "../middlewares/auth-role";

 
const router  = Router();
router.post('/update/:document',verifyToken, validateRole(['company']), updateProvider);

export default router;


