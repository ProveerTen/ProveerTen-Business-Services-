"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const profileService = (query, id, callback) => {
    try {
        db_mysql_1.default.query(query, [id], (error, results) => {
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
};
const getCompanyByProvider = (id) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.query("select * from provider join company on provider.fk_nit_company = company.nit_company where document_provider = (?)", id, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
const getProviderByCompany = (id) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.query("select * from company join provider on company.nit_company = provider.fk_nit_company where nit_company = (?)", id, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
exports.default = {
    profileService,
    getCompanyByProvider,
    getProviderByCompany
};
