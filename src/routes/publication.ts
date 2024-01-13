import { Router } from "express";
import { createPublication, updateDataPublication } from '../controllers/publication-controller';
import multer from '../libs/multer';
import { verifyToken } from "../middlewares/auth-token";

const router = Router();

router.post('/create', verifyToken, multer.single('image'), createPublication);
router.patch('/update', verifyToken, multer.single('image'), updateDataPublication);
router.delete('/delete');

export default router;