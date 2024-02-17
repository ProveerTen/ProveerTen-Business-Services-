import { Router } from "express";
import { createPublication, deleteOnePublication, getAllPublications, getPublicationById, getPublicationsByCompany, updateDataPublication } from '../controllers/publication-controller';
import multer from '../libs/multer';
import { verifyToken } from "../middlewares/auth-token";
import { validateRole } from "../middlewares/auth-role";

const router = Router();

router.post('/create', verifyToken, validateRole(['company']), multer.single('image'), createPublication);
router.delete('/delete/:id', verifyToken, validateRole(['company']), deleteOnePublication);

router.get('/view/', verifyToken, validateRole(['grocer']), getAllPublications); //
router.get('/viewUserCero/',  getAllPublications); // para usuario cero
// router.get('/view/', getAllPublications); //

router.get('/view/:id', verifyToken, validateRole(['company']), getPublicationById);

router.get('/view/company/:id', verifyToken, getPublicationsByCompany);
router.get('/viewUserCero/company/:id', getPublicationsByCompany); // para usuario cero

router.patch('/update', verifyToken, validateRole(['company']), multer.single('image'), updateDataPublication);

export default router;