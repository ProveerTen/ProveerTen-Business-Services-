"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompaniesByNameService = exports.getProductsByNameService = void 0;
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const getProductsByNameService = (value) => {
    const query = "call filter_products(?)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, value, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    });
};
exports.getProductsByNameService = getProductsByNameService;
const getCompaniesByNameService = (value) => {
    const query = "call filter_companies(?)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, value, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    });
};
exports.getCompaniesByNameService = getCompaniesByNameService;
