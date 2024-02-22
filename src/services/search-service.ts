import pool from "../config/db-mysql";

export const getProductsByNameService = (value: string) => {

    const query = "call filter_products(?)";

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, value, (error: any, result: any) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    })
};

export const getCompaniesByNameService = (value: string) => {

    const query = "call filter_companies(?)";

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, value, (error: any, result: any) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    })
};