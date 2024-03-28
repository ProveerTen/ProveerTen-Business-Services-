import { Request, Response } from "express";
import { dataDecoded } from "../middlewares/auth-token";
import generateRandomString from "../helpers/generate-string";
import Order from "../models/order";
import { insert_order, insert_products_order, get_stock, delete_order, get_quantity_order, reset_quantity_order, get_orders_grocer, get_orders_provider, get_orders_company, get_orders_detail, get_order, get_providers_city, delete_products_order, updateOrdersProducts } from '../services/order';
import { get_companies, get_products, get_providers, get_name_store_grocer } from "../services/order";
import { generateOrderEmailContent } from "../helpers/generate_email";
import { product } from './product-controller';
import { body } from "express-validator";
import { update_status_order } from "../services/order";
export const createOrder = async (req: Request, res: Response) => {

    try {
        const { email } = dataDecoded;

        const {
            order_delivery_date,
            total_ordered_price,
            status,
            document_provider,
            products
        } = req.body;

        let name_store = await get_name_store_grocer(dataDecoded.id);
        let id_order = name_store.replace(/\s/g, '_') + '_' + generateRandomString(10);

        const data: Order = {
            id_order: id_order,
            order_delivery_date,
            total_ordered_price,
            status,
            document_provider,
            document_grocer: dataDecoded.id,
            products
        }


        let success: boolean = false;

        await Promise.all(products.map(async (item: any) => {
            let data = await get_stock(item.id_product);
            if (data[0].stock_product >= item.product_quantity) {
                success = true;
            } else {
                success = false;
            }
        }));

        if (success) {
            await insert_order(data);
            insert_products_order(id_order, data.products).then(async (mensaje: any) => {
                generateOrderEmailContent(mensaje[0][1], mensaje[0][2], email)
                res.status(200).json({ message: mensaje[0][0][0].message_text });
            }).catch((error: any) => { res.status(500).json({ message: error.sqlMessage }); });
        } else {
            res.status(500).json({ message: "stock insuficiente" });
        }

    } catch (error) {
        console.log('Error');
        res.status(400).json({ "error": "error al crear el pedido" })
    }


};


export const deleteOrder = async (req: Request, res: Response) => {

    try {
        const { id_order } = req.body


        let quantity: any = await get_quantity_order(id_order);

        console.log(quantity[0]);

        delete_order(id_order).then((mensaje: any) => {
            quantity[0].forEach((item: any) => {
                reset_quantity_order(item.fk_id_product, item.quantity)
            });
            res.status(200).json({ message: mensaje[0][0].message_text });
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const deleteOrderProduct = async (req: Request, res: Response) => {

    try {
        const { id_order } = req.body


        let quantity: any = await get_quantity_order(id_order);

        console.log(quantity[0]);

        delete_order(id_order).then((mensaje: any) => {
            quantity[0].forEach((item: any) => {
                reset_quantity_order(item.fk_id_product, item.quantity)
            });
            res.status(200).json({ message: mensaje[0][0].message_text });
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}


export const companies = async (req: Request, res: Response) => {

    let { id } = dataDecoded;

    console.log(id);


    try {
        let companies = await get_companies(id);

        if (companies) {
            res.status(200).json({ "companies": companies[0] })
        }

    } catch (error) {
        res.status(400).json({
            error
        })
    }

};


export const providers = async (req: Request, res: Response) => {
    let { nit_company } = req.body;

    try {
        let providers = await get_providers(nit_company)

        if (providers) {
            res.status(200).json({ "providers": providers[0] })
        }

    } catch (error) {
        res.status(400).json({
            error
        })
    }

};



export const products = async (req: Request, res: Response) => {
    let { nit_company } = req.body;

    try {
        let products = await get_products(nit_company)

        if (products) {
            res.status(200).json({ "products": products[0] })
        }

    } catch (error) {
        res.status(400).json({
            error
        })
    }
};

export const orders_grocer = async (req: Request, res: Response) => {
    let document_grocer = dataDecoded.id

    try {
        let order: any = await get_orders_grocer(document_grocer)
        res.status(200).json({ "order": order })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

};

export const orders_provider = async (req: Request, res: Response) => {
    let document_provider = dataDecoded.id

    try {
        let order: any = await get_orders_provider(document_provider)
        res.status(200).json({ "order": order })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

};

export const orders_company = async (req: Request, res: Response) => {
    let nit_company = dataDecoded.id

    try {
        let order: any = await get_orders_company(nit_company)
        res.status(200).json({ "order": order })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

};

export const orders_details = async (req: Request, res: Response) => {
    let { id_order } = req.body;

    try {
        let order_detail: any = await get_orders_detail(id_order)
        let order: any = await get_order(id_order)
        res.status(200).json({
            order, order_detail
        }
        )
    } catch (error) {
        res.status(400).json({
            error
        })
    }

};


export const orderandproducts = async (req: Request, res: Response) => {
    let { id_order } = req.body;
    console.log(id_order);


    try {
        let order_detail: any = await get_orders_detail(id_order);
        let order: any = await get_order(id_order);
        let products = await get_products(order_detail[0].fk_product_nit_company);
        products = products[0];

        let productsdistint: any[] = [];
        productsdistint = products.filter((product: any) => { return !order_detail.find((orderItem: any) => orderItem.fk_id_product === product.id_product); });

        res.status(200).json({
            productsdistint,
        });
    } catch (error) {
        res.status(400).json({
            error,
        });
    }

};


export const updateOrder = async (req: Request, res: Response) => {

    try {
        const { id_order, list_update, list_delete } = req.body

        let success: boolean = false;

        await Promise.all(list_update.map(async (item: any) => {
            let data = await get_stock(item.id_product);
            if (data[0].stock_product >= item.quantity) {
                success = true;
            } else {
                success = false;
            }
        }));

        if (success) {
            let message: string = '';
            await updateOrdersProducts(id_order, list_update).then(async (mensaje: any) => {
                message = mensaje[0][0][0].message_text
            }).catch((error: any) => { res.status(500).json({ message: error.sqlMessage }); console.log(error) });

            await delete_products_order(id_order, list_delete)
            list_delete.forEach((product: any) => {
                reset_quantity_order(product.fk_id_product, product.quantity)
            });

            res.status(200).json({ mensaje: message });
        } else {

            res.status(500).json({ message: "stock insuficiente" });
        }

    } catch (error) {
        res.status(400).json({ error })
    }
}


export const updateStatusOrder = async (req: Request, res: Response) => {

    try {
        const { id_order, status } = req.body;

        await update_status_order(id_order, status).then(async (mensaje: any) => {
            res.status(200).json({ message: mensaje[0][0].message_text });
        }).catch((error: any) => {
            res.status(500).json({ message: error });
        });

    } catch (error:any) {
        res.status(400).json({ error })
    }
}


export const filter_providers_location = async (req: Request, res: Response) => {

    try {
        const data = {
            companyId: req.body.companyId,
            grocerId: req.body.grocerId
        }
        let providersbycity = await get_providers_city(data);
        res.status(200).json({ providersbycity })
    }
    catch (error) {
        res.status(400).json({ message: "Error internal server" })
    }

}
