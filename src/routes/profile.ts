import { Router } from "express"
import { company, provider, grocer } from '../controllers/profile-controller'

const router = Router();

router.post('/company', company);
router.post('/provider', provider);
router.post('/grocer', grocer);

export default router;
