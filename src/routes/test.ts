import { Router } from 'express';
import jwt from '../middleware/auth-token';
import test from '../controllers/test-controller';

const routerTest = Router();

routerTest.get('/', jwt.jwtAuth, test.testController);

export { routerTest };