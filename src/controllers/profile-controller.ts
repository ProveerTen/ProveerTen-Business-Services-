import { Request, Response } from 'express';
import profile from '../services/profile-service';
import { dataDecoded } from '../middlewares/auth-token';

export const company = (req: Request, res: Response) => {

    let { id } = dataDecoded;

    const query = 'call get_data_profile_company(?);';

    profile.profileService(query, id, (error: any, data: any) => {
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

    let { id } = dataDecoded;

    const query = 'call get_data_profile_provider(?);';

    profile.profileService(query, id, (error: any, data: any) => {
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

export const grocers = (req: Request, res: Response) => {

    let { id } = dataDecoded;

    const query = 'call get_data_profile_grocer(?);';

    profile.profileService(query, id, (error: any, data: any) => {

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

export const companies = async (req: Request, res: Response) => {

    try {
        let { id } = req.params;

        if (dataDecoded.role === 'provider') {
            let result: any = await profile.getCompanyByProvider(dataDecoded.id, id);

            if (result.length == 0) {
                return res.status(404).json({ Status: 'Error' });
            }
        }

        const query = 'call get_data_profile_company(?);';

        profile.profileService(query, id, (error: any, data: any) => {
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
    } catch (error) {
        console.log('Error');
        res.status(400).json(error)
    }
};

export const providers = async (req: Request, res: Response) => {

    try {
        let { id } = req.params;

        if (dataDecoded.role === 'company') {
            console.log(req.params);
            console.log(dataDecoded.id);

            let result: any = await profile.getProviderByCompany(dataDecoded.id, id);
            console.log('a');

            if (result.length == 0) {
                console.log('b');
                return res.status(404).json({ Status: 'Error' });
            }
        }

        const query = 'call get_data_profile_provider(?);';

        profile.profileService(query, id, (error: any, data: any) => {
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
    } catch (error) {
        console.log('Error');
        res.status(400).json(error)
    }
};

export const allCompanies = async (req: Request, res: Response) => {

    try {

        const query = 'select nit_company, name_company, profile_photo_company from company'
        profile._allcompanies(query, (error: any, data: any) => {
                if (error) {
                    res.status(500).json({ "error": error.message });
                } else {
                    if (data) {
                        res.status(200).json({ status: 'Ok data', data })
                    }
                }
                })
    } catch (error) {
        console.log('Error');
        res.status(400).json(error)
    }
};

export const grocer = (req: Request, res: Response) => {

    let { id } = dataDecoded;

    const query = 'call get_data_profile_grocer(?);';

    profile.profileService(query, id, (error: any, data: any) => {

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