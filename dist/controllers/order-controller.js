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
exports.products = exports.providers = exports.companies = exports.createOrder = void 0;
const auth_token_1 = require("../middlewares/auth-token");
const generate_string_1 = __importDefault(require("../helpers/generate-string"));
const order_1 = require("../services/order");
const order_2 = require("../services/order");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_delivery_date, total_ordered_price, status, document_provider, products } = req.body;
        let name_store = yield (0, order_2.get_name_store_grocer)(auth_token_1.dataDecoded.id);
        let id_order = name_store.replace(/\s/g, '_') + '_' + (0, generate_string_1.default)(10);
        const data = {
            id_order: id_order,
            order_delivery_date,
            total_ordered_price,
            status,
            document_provider,
            document_grocer: auth_token_1.dataDecoded.id,
            products
        };
        let success = false;
        yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            let data = yield (0, order_1.get_stock)(item.id_product);
            if (data[0].stock_product > item.quantity) {
                success = true;
            }
            else {
                success = false;
            }
        })));
        if (success) {
            yield (0, order_1.insert_order)(data);
            (0, order_1.insert_products_order)(id_order, data.products).then((mensaje) => {
                res.status(200).json({ message: mensaje[0][0][0].message_text });
            })
                .catch((error) => {
                res.status(500).json({ message: error.sqlMessage });
            });
        }
        else {
            res.status(500).json({ message: "stock insuficiente" });
        }
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.createOrder = createOrder;
const companies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let companies = yield (0, order_2.get_companies)();
        if (companies) {
            res.status(200).json({ "companies": companies[0] });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.companies = companies;
const providers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { nit_company } = req.body;
    try {
        let providers = yield (0, order_2.get_providers)(nit_company);
        if (providers) {
            res.status(200).json({ "providers": providers[0] });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.providers = providers;
const products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { nit_company } = req.body;
    try {
        let products = yield (0, order_2.get_products)(nit_company);
        if (products) {
            res.status(200).json({ "products": products[0] });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.products = products;
