import connection from "../config/db-config";

export const get_names_category = (): Promise<any> => {

    const query = 'call get_names_category';

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

export const create_category = (name: string): Promise<any> => {

    const query = 'call insertCategory(?, @message_text)';

    return new Promise((resolve, reject) => {
        connection.query(query, name, (error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject(error)
            }
            resolve(result)
        });
    })
}

