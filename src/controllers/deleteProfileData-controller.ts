import { Request, Response } from 'express';
import { dataDecoded } from '../middlewares/auth-token';
import deleteDataService from '../services/delete-profileData-service';

export const deleteDataProfile = (req: Request, res: Response)=> {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }
        
        deleteDataService.deleteDataProfile(credentials, req.query, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });

    } catch (error) {
        res.status(500).json({ "failed to delete data profile": error });        
    }
} 