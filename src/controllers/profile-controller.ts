import { Request, Response } from 'express';
import profile from '../services/profile-service';

export const company = (req: Request, res: Response) => {
    let { nit_company } = req.body;

    const query = 'call get_data_profile_company(?);';

    profile.profileService(query, nit_company, (error: any, data: any) => {
        if (error) {
            res.status(500).json({ "error": error.message });
        } else {
            if (data) {
                res.status(200).json({ status: 'Ok data', data })
            } else {
                return res.status(404).json({ Status: 'Error' });
            }
        }
    });
};

export const provider = (req: Request, res: Response) => {
    let { document_provider } = req.body;

    const query = 'call get_data_profile_provider(?);';

    profile.profileService(query, document_provider, (error: any, data: any) => {
        if (error) {
            res.status(500).json({ "error": error.message });
        } else {
            if (data) {
                res.status(200).json({ status: 'Ok data', data })
            } else {
                return res.status(404).json({ Status: 'Error' });
            }
        }
    });
};

export const grocer = (req: Request, res: Response) => {
    let { document_grocer } = req.body;

    const query = 'call get_data_profile_grocer(?);';

    profile.profileService(query, document_grocer, (error: any, data: any) => {

        if (error) {
            res.status(500).json({ "error": error.message });
        } else {
            if (data) {
                res.status(200).json({ status: 'Ok data', data })
            } else {
                return res.status(404).json({ Status: 'Error' });
            }
        }
    });
};