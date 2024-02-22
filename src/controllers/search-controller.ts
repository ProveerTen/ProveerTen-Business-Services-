import { Request, Response } from "express";
import { getProductsByNameService } from '../services/search-service';

export const getProductsByName = async (req: Request, res: Response) => {
    try {

        const { value } = req.body;

        let values = await getProductsByNameService(value);

        res.status(200).json({ values });

    } catch (error) {
        console.log(error);

        res.status(400).json({
            error
        });
    }
}

export const getProductsByCategories = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(400).json({
            error
        });
    }
}

export const getCompaniesByName = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(400).json({
            error
        });
    }
}

export const getCompaniesByCategories = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(400).json({
            error
        });
    }
}