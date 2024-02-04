"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* import connection from "../config/db-mysql";

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


*/
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const profileService = (query, id, callback) => {
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            connection.query(query, [id], (error, results) => {
                connection.release();
                if (error) {
                    return callback(error);
                }
                let data = results[0][0];
                callback(null, data);
            });
        }
        catch (error) {
            return callback(error);
        }
    });
};
const getCompanyByProvider = (id) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query("select * from provider join company on provider.fk_nit_company = company.nit_company where document_provider = (?)", id, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};
const getProviderByCompany = (id) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query("select * from company join provider on company.nit_company = provider.fk_nit_company where nit_company = (?)", id, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};
exports.default = {
    profileService,
    getCompanyByProvider,
    getProviderByCompany
};
