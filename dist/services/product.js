"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_product_category = exports.insert_product = exports.get_name_company = void 0;
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const get_name_company = (nit_company) => {
    const query = 'call  get_name_company_by_id(?)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.query(query, nit_company, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result[0][0].name_company);
        });
    });
};
exports.get_name_company = get_name_company;
const insert_product = (data) => {
    const query = 'call insertProduct(?,?,?,?,?,?,?,?,?,?,?,?,@message_text)';
    return new Promise((resolve, reject) => {
        db_mysql_1.default.query(query, [
            data.id_product,
            data.name_product,
            data.description_product,
            data.purchase_price_product,
            data.unit_purchase_price_product,
            data.suggested_unit_selling_price_product,
            data.purchase_quantity,
            data.stock_product,
            data.content_product,
            data.image_product,
            data.availability_product,
            data.fk_product_nit_company
        ], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
exports.insert_product = insert_product;
// export const insert_product_category = (id_product: string, categories: string[]): Promise<string[]> => {
//     const query = 'call  insert_product_category(?, ?, @message_text)';
//     const promises: Promise<string>[] = [];
//     categories.forEach(category => {
//         const promise = new Promise<string>((resolve, reject) => {
//             connection.query(query, [id_product, category], (error: any, result: any) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
//         promises.push(promise);
//     });
//     return Promise.all(promises);
// };
const insert_product_category = (id_product, categories) => {
    const query = 'call  insert_product_category(?, ?, @message_text)';
    categories.forEach(category => {
        return new Promise((resolve, reject) => {
            db_mysql_1.default.query(query, [id_product, category], (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
};
exports.insert_product_category = insert_product_category;
