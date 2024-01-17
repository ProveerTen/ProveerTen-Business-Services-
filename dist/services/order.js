"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_stock = exports.insert_products_order = exports.insert_order = exports.get_providers = exports.get_products = exports.get_name_store_grocer = exports.get_companies = void 0;
const db_config_1 = __importDefault(require("../config/db-config"));
const get_companies = () => {
    const query = 'call get_companies';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, (error, result) => {
            if (error) {
                console.log(error);
                return reject('error');
            }
            resolve(result);
        });
    });
};
exports.get_companies = get_companies;
const get_name_store_grocer = (document_grocer) => {
    const query = 'call get_store_grocer_by_id(?);';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, document_grocer, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result[0][0].name_store);
        });
    });
};
exports.get_name_store_grocer = get_name_store_grocer;
const get_products = (nit_company) => {
    const query = 'call get_products (?);';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, nit_company, (error, result) => {
            if (error) {
                console.log(error);
                return reject('error');
            }
            resolve(result);
        });
    });
};
exports.get_products = get_products;
const get_providers = (nit_company) => {
    const query = 'call get_providers (?);';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, nit_company, (error, result) => {
            if (error) {
                console.log(error);
                return reject('error');
            }
            resolve(result);
        });
    });
};
exports.get_providers = get_providers;
const insert_order = (data) => {
    const query = 'call insertOrders (?,?,?,?,?,?,@message_text)';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, [
            data.id_order,
            data.order_delivery_date,
            data.total_ordered_price,
            data.status,
            data.document_provider,
            data.document_grocer
        ], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
exports.insert_order = insert_order;
const insert_products_order = (id_order, products) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'call insertOrdersProducts (?,?,?,@message_text)';
    const promises = [];
    products.forEach((item) => {
        const promise = new Promise((resolve, reject) => {
            db_config_1.default.query(query, [id_order, item.id_product, item.quantity], (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
        promises.push(promise);
    });
    return Promise.all(promises);
});
exports.insert_products_order = insert_products_order;
const get_stock = (id_product) => {
    const query = 'call get_stock(?)';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, id_product, (error, result) => {
            if (error) {
                console.log(error);
                return reject('error');
            }
            resolve(result[0]);
        });
    });
};
exports.get_stock = get_stock;
