import { Router } from "express";
import {authJwt}  from "../middlewares/delete-validator";
import { deleteProvider } from "../controllers/delete-provider-controller";

const router  = Router();


router.post ('/delete/:document',authJwt, deleteProvider);

export default router;