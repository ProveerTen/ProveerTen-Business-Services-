import pool from '../config/db-mysql';

export const get_names_category = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            const query = 'call get_names_category';
            connection.query(query, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error')
                }
                resolve(result)
            });
        })
    });
}

export const create_category = (name: string): Promise<any> => {

    const query = 'call insertCategory(?, @message_text)';

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, name, (error: any, result: any) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject(error)
                }
                resolve(result)
            });
        });
    });
}