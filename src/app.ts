import express from 'express';
import { routerTest } from './routes/test';

const app = express();

app.use(express.json());

app.use('/test', routerTest);

export default app;