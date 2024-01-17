import connection from "../config/db-mysql";

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

const getCompanyByProvider = (id: string) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from provider join company on provider.fk_nit_company = company.nit_company where document_provider = (?)", id, (error: any, result: any) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

const getProviderByCompany = (id: string) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from company join provider on company.nit_company = provider.fk_nit_company where nit_company = (?)", id, (error: any, result: any) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

export default {
    profileService,
    getCompanyByProvider,
    getProviderByCompany
}