"use strict";
/*
import connection from "../config/db-mysql";

export const view_companies = (): Promise<any> => {

    const query = 'call view_companies';
    
    return new Promise((resolve, reject) => {
        connection.query(query,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}

export const view_categories = (): Promise<any> => {

    const query = 'call view_categories';
    
    return new Promise((resolve, reject) => {
        connection.query(query,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}

export const view_categories_different = (): Promise<any> => {

    const query = 'call view_categories_different()';
    
    return new Promise((resolve, reject) => {
        connection.query(query,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}


export const view_grocers = (): Promise<any> => {

    const query = 'call view_grocers';
    
    return new Promise((resolve, reject) => {
        connection.query(query,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}

export const view_products = (): Promise<any> => {

    const query = 'call view_products';
    
    return new Promise((resolve, reject) => {
        connection.query(query,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}

export const view_price_products = (): Promise<any> => {

    const query = 'call view_price_products';
    
    return new Promise((resolve, reject) => {
        connection.query(query,(error: any, result: any) => {
            if (error) {
                console.log(error);
                return reject('error')
            }
            resolve(result[0])
        });
    })
}

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.view_price_products = exports.view_products = exports.view_grocers = exports.view_categories_different = exports.view_categories = exports.view_companies = void 0;
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const view_companies = () => {
    const query = 'call view_companies';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.view_companies = view_companies;
const view_categories = () => {
    const query = 'call view_categories';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.view_categories = view_categories;
const view_categories_different = () => {
    const query = 'call view_categories_different()';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.view_categories_different = view_categories_different;
const view_grocers = (document_provider) => {
    const query = 'call view_grocers (?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, document_provider, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.view_grocers = view_grocers;
const view_products = () => {
    const query = 'call view_products';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.view_products = view_products;
const view_price_products = () => {
    const query = 'call view_price_products';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return reject('error');
                }
                resolve(result[0]);
            });
        });
    });
};
exports.view_price_products = view_price_products;
