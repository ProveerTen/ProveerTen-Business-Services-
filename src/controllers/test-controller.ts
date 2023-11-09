import { Request, Response } from 'express';

let testController = (req: Request, res: Response) => {
    res.send('Acceso a test')
};

export default { testController };