import pool from '../config/db-mysql';

export const view_companies = (document_grocer: string): Promise<any> => {

    const query = 'call view_companies(?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, document_grocer, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    })
}

export const view_companies_by_location = (city: string,department:string): Promise<any> => {

    const query = 'call view_companies_by_location(?,?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query,[city,department], (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    });
}

export const view_categories = (): Promise<any> => {

    const query = 'call view_categories';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    })
}

export const view_subCategories = (name_category:any): Promise<any> => {

    const query = 'call view_subCategories(?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query,name_category, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    })
}


export const view_categories_different = (): Promise<any> => {

    const query = 'call view_categories_different()';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    })
}


export const view_grocers = (document_provider: string): Promise<any> => {

    const query = 'call view_grocers (?)';

    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, document_provider, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    });
}

export const view_products = (document_grocer: string): Promise<any> => {

    const query = 'call view_products(?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, document_grocer, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    });
}

export const view_products_by_location = (city: string,department:string): Promise<any> => {

    const query = 'call view_products_by_location(?,?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query,[city,department], (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    });
}

export const view_price_products = (document_grocer: string): Promise<any> => {

    const query = 'call view_price_products(?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, document_grocer, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result[0])
            });
        });
    });
}
