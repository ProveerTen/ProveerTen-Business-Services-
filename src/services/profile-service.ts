import pool from '../config/db-mysql';

const profileService = (query: string, id: string, callback: any) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            connection.query(query, [id], (error: any, results: any) => {
                connection.release();
                if (error) {
                    return callback(error);
                }

                let data = results[0][0];

                callback(null, data);
            });
        } catch (error) {
            return callback(error);
        }
    });
};

const getCompanyByProvider = (id_provider: string, id: string) => {

    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query("select * from company join provider on company.nit_company = provider.fk_nit_company where company.nit_company = (?) and provider.document_provider = (?);", [id, id_provider], (error: any, result: any) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};

const getProviderByCompany = (id_company: string, id: string) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query("select * from provider join company on provider.fk_nit_company = company.nit_company where document_provider = (?) and provider.fk_nit_company = (?)", [id, id_company], (error: any, result: any) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};

const _allcompanies = (query: string, callback: any) => {
    pool.getConnection((err, connection) => {

        try {
            if (err) {
                console.log(err);
                callback(err)
            }
            connection.query(query, (error: any, results: any) => {
                connection.release();
                if (error) {
                    return callback(error);
                }

                let data = results;
                console.log("RESULTS", results);

                callback(null, data);
            });

        } catch (error) {
            console.log(error);
        }
    });
    // });
}
export default {
    profileService,
    getCompanyByProvider,
    getProviderByCompany,
    _allcompanies
}