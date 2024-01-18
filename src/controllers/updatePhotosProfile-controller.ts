import { Request, Response } from 'express';
import { dataDecoded } from '../middlewares/auth-token';
import updatePhotoService from '../services/update-profilePhotos-service';

export const patchPhotoCompany = (req:Request, res:Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }
        updatePhotoService.updatePhotoCompany(credentials, req.file, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });

    } catch (error) {
        res.status(500).json({ "failed to update photo profile company": error });
    }
}

export const patchPhotoProvider = (req:Request, res:Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }
        updatePhotoService.updatePhotoProvider(credentials, req.file, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    } catch (error) {
        res.status(500).json({ "failed to update photo profile provider": error });
    }
}

export const patchPhotoGrocer = (req:Request, res:Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }
        updatePhotoService.updatePhotoGrocer(credentials, req.file, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
        
    } catch (error) {
        res.status(500).json({ "failed to update photo profile grocer": error });
    }
}