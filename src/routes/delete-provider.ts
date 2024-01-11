import { Router } from "express";
import { deleteProvider } from "../controllers/delete-provider-controller";
import { verifyToken } from "../middlewares/auth-token";
import { validateCompany } from "../middlewares/validate-role-validator";
const router  = Router();
router.post ('/delete/:document',verifyToken,validateCompany, deleteProvider);
export default router;