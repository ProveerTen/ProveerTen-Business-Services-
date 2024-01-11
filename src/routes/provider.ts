import { Router } from "express";
import authJwt from "../middlewares/jwt-validator";
import validator from '../middlewares/provider-params-validator'
import { updateProvider } from "../controllers/update-provider-controller";

const router  = Router();
router.post('/update/:document',authJwt, updateProvider);

export default router;


