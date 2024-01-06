import { Request, Response } from 'express';
import { dataDecoded } from '../middlewares/auth-token';
import { changePasswordCompany_, changePasswordProvider_, changePasswordGrocer_ } from '../services/changePassword-service';


export const changePasswordCompany = async (req: Request, res: Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }

        let oldPassword: string = req.body.old_password, newPassword: string = req.body.new_password;
        let newData = { oldPassword, newPassword }

        changePasswordCompany_(credentials, newData, (err: any, result: any) => {
            if (err) {
                res.status(500).json({ "error": err });
            }
            if (result) {
                res.status(200).json({ "Status": "oki", "result": result });
            }
        })
    } catch (error) {
        res.status(500).json({ "failed to change password company": error });
    }
};

export const changePasswordProvider = async (req: Request, res: Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }
        
        let oldPassword: string = req.body.old_password, newPassword: string = req.body.new_password;
        let newData = { oldPassword, newPassword }

        changePasswordProvider_(credentials, newData, (err: any, result: any) => {
            if (err) {
                res.status(500).json({ "error": err });
            }
            if (result) {
                res.status(200).json({ "Status": "oki", "result": result });
            }
        })
    } catch (error) {
        res.status(500).json({ "failed to change password provider": error });
    }
}

export const changePasswordGrocer = async (req: Request, res: Response) => {

    try {
        const { email, role, id } = dataDecoded;

        let credentials: object = {
            email,
            role,
            id
        }

        let oldPassword: string = req.body.old_password, newPassword: string = req.body.new_password;
        let newData = { oldPassword, newPassword }

        if (email !== undefined) {
            changePasswordGrocer_(credentials, newData, (err: any, result: any) => {
                if (err) {
                    res.status(500).json({ "error": err });
                }
                if (result) {
                    res.status(200).json({ "Status": "oki", "result": result });
                }
            })
        } else {
            res.status(500).json({ "error": "Datos no encontrados para la lectura" });
        }
    } catch (error) {
        res.status(500).json({ "failed to change password grocer": error });
    }
}