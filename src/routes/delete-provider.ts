import { Router } from "express";
import { deleteProvider } from "../controllers/delete-provider-controller";
import { verifyToken } from "../middlewares/auth-token";
import { validateRole } from "../middlewares/auth-role";

const router = Router();
router.post('/delete/:document', verifyToken,validateRole (['company']), deleteProvider);
export default router;