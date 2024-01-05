import { Router } from "express";
import { createPublication } from '../controllers/publication-controller';
import multer from '../libs/multer';
import { verifyToken } from "../middlewares/auth-token";

const router = Router();

router.post('/create', verifyToken, multer.single('image'), createPublication);
router.patch('/update');
router.delete('/delete');

export default router;