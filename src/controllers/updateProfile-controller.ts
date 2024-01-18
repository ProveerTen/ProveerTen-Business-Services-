import { Request, Response } from "express";
import updateService from "../services/update-profile-service";

import { dataDecoded } from '../middlewares/auth-token';


export const patchCompany = (req: Request, res: Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }

        updateService.updateDataCompany(credentials, req.body, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    } catch (error) {
        res.status(500).json({ "failed to update profile company": error });

    }
}

export const patchProvider = (req: Request, res: Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }

        updateService.updateDataProvider(credentials, req.body, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });

    } catch (error) {
        res.status(500).json({ "failed to update profile provider": error });
    }
}

export const patchGrocer = (req: Request, res: Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }

        updateService.updateDataGrocer(credentials, req.body, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    } catch (error) {
        res.status(500).json({ "failed to update profile grocer": error });
    }

}

// esto es para ver el pefil ignorar
export const getData = (req: Request, res: Response) => {
    try {
        const { email, role, id } = dataDecoded;

        //nombre de la pk cambiarla segun la necesidad call get_data_profile_company(?), call get_data_profile_provider(?), call get_data_profile_grocer(?)
        updateService.getCurrentData('call get_data_profile_grocer(?)', id, (error: any, results: any) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });

    } catch (error) {
        res.status(500).json({ "failed to view profile user": error });
    }
}
