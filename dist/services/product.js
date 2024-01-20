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
exports.updateDataProdcut = exports.getImage = exports.verifyExistProduct = exports.insert_product_category = exports.insert_product = exports.get_name_company = void 0;
const db_config_1 = __importDefault(require("../config/db-config"));
const get_name_company = (nit_company) => {
    const query = "call  get_name_company_by_id(?)";
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, nit_company, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result[0][0].name_company);
        });
    });
};
exports.get_name_company = get_name_company;
const insert_product = (data) => {
    const query = "call insertProduct(?,?,?,?,?,?,?,?,?,?,?,?,@message_text)";
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, [
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
        ], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
exports.insert_product = insert_product;
const insert_product_category = (id_product, categories) => {
    const query = "call  insert_product_category(?, ?, @message_text)";
    categories.forEach((category) => {
        return new Promise((resolve, reject) => {
            db_config_1.default.query(query, [id_product, category], (error, result) => {
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
const verifyExistProduct = (idP) => {
    const queryV = "SELECT * FROM product WHERE id_product = ?";
    return new Promise((resolve, reject) => {
        db_config_1.default.query(queryV, idP, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.verifyExistProduct = verifyExistProduct;
const getImage = (idProducto) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existenciaProducto = yield (0, exports.verifyExistProduct)(idProducto);
            if (existenciaProducto) {
                const queryObtenerImagen = "SELECT image_product FROM product WHERE id_product = ?";
                db_config_1.default.query(queryObtenerImagen, idProducto, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.getImage = getImage;
const updateDataProdcut = (data) => {
    return new Promise((resolve, reject) => {
        const query = "call UpdateProduct (?,?,?,?,?,?,?,?,?,?,?,?, @message_text);";
        db_config_1.default.query(query, [
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
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.updateDataProdcut = updateDataProdcut;
