import connection from "../config/db-config";

export const get_companies = (): Promise<any> => {

    const query = 'call get_companies';
    
    return new Promise((resolve, reject) => {
        connection.query(query, (error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result)
        });
    })
}

export const get_name_store_grocer = (document_grocer: string): Promise<string> => {

    const query = 'call get_store_grocer_by_id(?);';

    return new Promise((resolve, reject) => {
        connection.query(query, document_grocer, (error: any, result: any) => {
            if (error) {
                return reject(error)
            }
            resolve(result[0][0].name_store)
        });
    })
}



export const get_products = (nit_company: string): Promise<any> => {

    const query = 'call get_products (?);';

    return new Promise((resolve, reject) => {
        connection.query(query, nit_company ,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result)
        });
    })
}

export const get_providers = (nit_company: string): Promise<any> => {

    const query = 'call get_providers (?);';

    return new Promise((resolve, reject) => {
        connection.query(query, nit_company ,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result)
        });
    })
}


export const insert_order = (data: any): Promise<any> => {

    const query = 'call insertOrders (?,?,?,?,?,?,@message_text)';

    return new Promise((resolve, reject) => {
        connection.query(query,
            [
                data.id_order,
                data.order_delivery_date,
                data.total_ordered_price,
                data.status,
                data.document_provider,
                data.document_grocer
            ]
            , (error: any, result: any) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            });
    })
}


export const insert_products_order = async (id_order: string, products: any[]) => {
    
    const query = 'call insertOrdersProducts (?,?,?,@message_text)';
    const promises: Promise<any>[] = [];

    products.forEach((item: any) => {
        const promise = new Promise((resolve, reject) => {
            connection.query(query, [id_order, item.id_product, item.quantity], (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                    
                }
            });
        });

        promises.push(promise); 
    });

    return Promise.all(promises);
}; 


export const get_stock = (id_product:string): Promise<any> => {

    const query = 'call get_stock(?)';
    
    return new Promise((resolve, reject) => {
        connection.query(query,id_product, (error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}