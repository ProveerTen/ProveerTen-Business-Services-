import { Router } from "express";
import { createPublication, deleteOnePublication, getAllPublications, getAllPublicationsByLocation, getPublicationById, getPublicationsByCompany, updateDataPublication } from '../controllers/publication-controller';
import multer from '../libs/multer';
import { verifyToken } from "../middlewares/auth-token";
import { validateRole } from "../middlewares/auth-role";

const router = Router();

router.post('/create', verifyToken, validateRole(['company']), multer.single('image'), createPublication);
router.delete('/delete/:id', verifyToken, validateRole(['company']), deleteOnePublication);
router.post('/view/', getAllPublications);
router.post('/view/location', getAllPublicationsByLocation);
router.get('/view/:id', verifyToken, validateRole(['company']), getPublicationById);
router.get('/view/company/:id', verifyToken, getPublicationsByCompany);
router.get('/data/view/company/:id', getPublicationsByCompany);
router.patch('/update', verifyToken, validateRole(['company']), multer.single('image'), updateDataPublication);

export default router;