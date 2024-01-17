import { Request, Response } from "express";
import fs from 'fs-extra';

import cloudinary from '../libs/cloudinary';
import Product from '../models/Product';
import { get_name_company, insert_product, insert_product_category } from "../services/product";
import { dataDecoded } from "../middlewares/auth-token";
import generateRandomString from "../helpers/generate-string";


export const createProduct = async (req: Request, res: Response) => {

    let image: string;
    let result_cloudinary: any;

    try {

        const {
            name_product,
            description_product,
            purchase_price_product,
            unit_purchase_price_product,
            suggested_unit_selling_price_product,
            purchase_quantity,
            stock_product,
            content_product,
            availability_product,
            categories
        } = req.body;

        let name_company = await get_name_company(dataDecoded.id) + '_' + name_product.replace(/\s/g, '_');

        let id_product = name_company + '_' + generateRandomString(5);

        if (req.file?.path!) {
            result_cloudinary = await cloudinary.uploader.upload(req.file?.path!);
            image = result_cloudinary.secure_url;
            fs.unlink(req.file.path);
        }

        const data: Product = {
            id_product,
            name_product,
            description_product,
            purchase_price_product,
            unit_purchase_price_product,
            suggested_unit_selling_price_product,
            purchase_quantity,
            stock_product,
            content_product,
            image_product: image!,
            availability_product,
            fk_product_nit_company: dataDecoded.id
        }

        await insert_product(data);

        insert_product_category(id_product, categories);

        res.status(200).json({ message: 'Ok' })

    } catch (error) {
        if (result_cloudinary.public_id) {
            await cloudinary.uploader.destroy(result_cloudinary.public_id)
        }
        console.log('Error');
        res.status(400).json(error)
    }
};