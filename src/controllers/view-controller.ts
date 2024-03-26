import { Request, Response } from "express";
import { view_categories, view_categories_different, view_companies, view_companies_by_location, view_grocers, view_price_products, view_products, view_products_by_location, view_subCategories } from "../services/view";


export const get_view_companies = async (req: Request, res: Response) => {

    try {

        const { document_grocer } = req.body;

        let companies = await view_companies(document_grocer);
        let categories = await view_categories_different();
        let categoriesByCompanies: any[] = [];


        companies.forEach((compania: any) => {

            const filteredCategories = categories.filter((category: any) => category.fk_product_nit_company === compania.nit_company);
            compania.categories = filteredCategories
            categoriesByCompanies.push(compania);
        });

        if (companies) {
            res.status(200).json({ categoriesByCompanies });
        }

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

export const get_view_products = async (req: Request, res: Response) => {

    try {

        const { document_grocer } = req.body;

        let products = await view_products(document_grocer);
        let categories = await view_categories();
        let categoriesByProducts: any[] = [];

        products.forEach((product: any) => {
            const filteredCategories = categories.filter((category: any) => category.fk_product_category_id_product === product.id_product);
            product.categories = filteredCategories;
            categoriesByProducts.push(product)
        });

        if (products) {
            res.status(200).json({ categoriesByProducts });
        }

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

export const get_view_price_products = async (req: Request, res: Response) => {

    try {

        const { document_grocer } = req.body;

        let products = await view_price_products(document_grocer);
        let categories = await view_categories();
        let categoriesByProductsPrice: any[] = [];

        products.forEach((product: any) => {
            const filteredCategories = categories.filter((category: any) => category.fk_product_category_id_product === product.id_product);
            product.categories = filteredCategories;
            categoriesByProductsPrice.push(product)
        });

        if (products) {
            res.status(200).json({ categoriesByProductsPrice });
        }

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};





export const get_view_grocers = async (req: Request, res: Response) => {

    try {

        let { document_provider } = req.body

        let grocers = await view_grocers(document_provider);

        if (grocers) {
            res.status(200).json({ grocers });
        }

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

export const products_by_location = async (req: Request, res: Response) => {

    try {
        let { city, deparment } = req.body;

        let categoriesByProducts = await view_products_by_location(city, deparment);
        /*
        let categories = await view_categories();
        let categoriesByProducts: any[] = [];

        products.forEach((product: any) => {
            const filteredCategories = categories.filter((category: any) => category.fk_product_category_id_product === product.id_product);
            product.categories = filteredCategories;
            categoriesByProducts.push(product)
        });

        if (products) {
            res.status(200).json({ categoriesByProducts });
        }
        */
        if (categoriesByProducts) {
            res.status(200).json({ categoriesByProducts });
        }

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const companies_by_location = async (req: Request, res: Response) => {

    try {

        let { city, deparment } = req.body;

        let companies = await view_companies_by_location(city, deparment);

        let categories = await view_categories_different();
        let categoriesByCompanies: any[] = [];


        companies.forEach((compania: any) => {
            const filteredCategories = categories.filter((category: any) => category.fk_product_nit_company === compania.nit_company);
            compania.categories = filteredCategories
            categoriesByCompanies.push(compania);
        });

        if (companies) {
            res.status(200).json({ categoriesByCompanies });
        }

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};




export const get_view_subCategories = async (req: Request, res: Response) => {

    try {

        let { name_category } = req.body

        let categories = await view_subCategories(name_category);

        if (categories) {
            res.status(200).json({ categories });
        }

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};