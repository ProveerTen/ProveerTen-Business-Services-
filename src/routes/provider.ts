import { Router } from "express";
import authJwt from "../middlewares/provider/jwt-validator";
import validator from '../middlewares/provider/provider-params-validator'
import { updateProvider } from "../controllers/provider/update-provider-controller";

const router  = Router();
router.post('/update/:document',authJwt, updateProvider);

export default router;