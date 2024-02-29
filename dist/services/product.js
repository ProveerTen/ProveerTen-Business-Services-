"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_product = exports.get_product_price = exports.insert_suggest_product_price = exports.updateDataProduct = exports.verifyExistProduct = exports.delete_product_suggested = exports.delete_product_category = exports.deleteOldImage = exports.delete_product = exports.insert_product_category = exports.insert_product = exports.get_name_company = void 0;
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const get_name_company = (nit_company) => {
    const query = "call  get_name_company_by_id(?)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, nit_company, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result[0][0].name_company);
            });
        });
    });
};
exports.get_name_company = get_name_company;
const insert_product = (data) => {
    console.log("PRODUCT l ", data);
    const query = "call insertProduct(?,?,?,?,?,?,?,?,?,?,?,?,?,@message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, [
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
                data.date_creation,
                data.fk_product_nit_company,
            ], (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};
exports.insert_product = insert_product;
const insert_product_category = (id_product, categories) => {
    const query = "call insert_product_category(?, ?, @message_text)";
    categories.forEach((category) => {
        return new Promise((resolve, reject) => {
            db_mysql_1.default.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                connection.query(query, [id_product, category], (error, result) => {
                    connection.release();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    });
};
exports.insert_product_category = insert_product_category;
// delete
const delete_product = (id_product) => {
    const query = "call delete_product(?, @message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
};
exports.delete_product = delete_product;
const deleteOldImage = (urlImage, urlVaues, fieldName) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(urlImage, urlVaues, (err, result) => {
                connection.release();
                if (err) {
                    reject({ "Error al consultar en la bd:": err });
                }
                else {
                    let urlImagen = result[0][fieldName];
                    console.log("urlImagen", urlImagen);
                    if (urlImagen != null) {
                        let split = urlImagen.split(/[./]/);
                        console.log("Split", split);
                        resolve(split[9]);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    });
};
exports.deleteOldImage = deleteOldImage;
const delete_product_category = (id_product) => {
    const query = "call delete_product_category(?, @message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    });
};
exports.delete_product_category = delete_product_category;
const delete_product_suggested = (id_product) => {
    const query = "delete from suggested_product_price where fk_id_product_suggested_price = ?";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    });
};
exports.delete_product_suggested = delete_product_suggested;
const verifyExistProduct = (idP) => {
    const queryV = "SELECT * FROM product WHERE id_product = ?";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(queryV, idP, (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    });
};
exports.verifyExistProduct = verifyExistProduct;
const updateDataProduct = (data) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            const query = "call UpdateProduct (?,?,?,?,?,?,?,?,?,?,?,?, @message_text);";
            connection.query(query, [
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
                data.fk_product_nit_company,
            ], (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    });
};
exports.updateDataProduct = updateDataProduct;
const insert_suggest_product_price = (id_product, document_grocer, price_product) => {
    const query = "call suggest_product_price(?,?,?,@message_text)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, [id_product, document_grocer, price_product], (error, result) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    });
};
exports.insert_suggest_product_price = insert_suggest_product_price;
const get_product_price = (id_product) => {
    const query = "select suggested_unit_selling_price_product from product where id_product = (?) ;";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    });
};
exports.get_product_price = get_product_price;
const get_product = (id_product) => {
    const query = "call get_product(?)";
    return new Promise((resolve, reject) => {
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            connection.query(query, id_product, (error, result) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });
};
exports.get_product = get_product;
