import connection from "../config/db-config";

const profileService = (query: string, id: string, callback: any) => {

    try {
        connection.query(query, [id], (error: any, results: any) => {
            if (error) {
                return callback(error);
            }

            let data = results[0][0];

            callback(null, data);
        });
    } catch (error) {
        return callback(error);
    }
};

export default {
    profileService
}