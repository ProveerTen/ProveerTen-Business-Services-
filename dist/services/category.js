"use strict";
//import connection from "../config/db-mysql";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_category = exports.get_names_category = void 0;
/*
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

*/
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const get_names_category = () => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            const query = 'call get_names_category';
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result);
            });
        });
    });
};
exports.get_names_category = get_names_category;
const create_category = (name) => {
    const query = 'call insertCategory(?, @message_text)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, name, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};
exports.create_category = create_category;
