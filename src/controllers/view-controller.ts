import { Request, Response } from "express";
import { view_categories, view_categories_different, view_companies, view_grocers, view_price_products, view_products } from "../services/view";


export const get_view_companies = async (req: Request, res: Response) => {

    try {
        let companies = await view_companies();
        let categories = await view_categories_different();
        let categoriesByCompanies: any[] = [];

        
        companies.forEach((compania:any) => {
            
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
        let products = await view_products();
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
        let products = await view_price_products();
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
        let grocers = await view_grocers();

        if (grocers) {
            res.status(200).json({ grocers });
        }
        
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};


