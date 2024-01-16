import { Request, Response } from "express";
import { create_category, get_names_category } from "../services/category";

export const createCategory = async (req: Request, res: Response) => {
    try {

        const { name_category } = req.body;

        let result = await create_category(name_category);

        if (result) {
            res.status(200).json({ result })
        } else {
            res.status(400).json({ message: 'Error' })
        }

    } catch (error) {
        console.log('Error');
        res.status(400).json(error)
    }
}

export const get_categories = async (req: Request, res: Response) => {
    try {

        let categories = await get_names_category();

        if (categories) {
            res.status(200).json({ categories })
        }

    } catch (error) {
        res.status(400).json({
            error
        })
    }
};


// export const deleteCategory = async (req: Request, res: Response) => {

//     try {
//         const { name_category } = req.body;

//         let result = await delete_category(name_category)

//         if (result) {
//             res.status(200).json({ result })
//         }

//     } catch (error) {
//         res.status(400).json({ error })
//     }
// }