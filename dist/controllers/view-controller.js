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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_view_grocers = exports.get_view_price_products = exports.get_view_products = exports.get_view_companies = void 0;
const view_1 = require("../services/view");
const get_view_companies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let companies = yield (0, view_1.view_companies)();
        let categories = yield (0, view_1.view_categories_different)();
        let categoriesByCompanies = [];
        companies.forEach((compania) => {
            const filteredCategories = categories.filter((category) => category.fk_product_nit_company === compania.nit_company);
            compania.categories = filteredCategories;
            categoriesByCompanies.push(compania);
        });
        if (companies) {
            res.status(200).json({ categoriesByCompanies });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.get_view_companies = get_view_companies;
const get_view_products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield (0, view_1.view_products)();
        let categories = yield (0, view_1.view_categories)();
        let categoriesByProducts = [];
        products.forEach((product) => {
            const filteredCategories = categories.filter((category) => category.fk_product_category_id_product === product.id_product);
            product.categories = filteredCategories;
            categoriesByProducts.push(product);
        });
        if (products) {
            res.status(200).json({ categoriesByProducts });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.get_view_products = get_view_products;
const get_view_price_products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield (0, view_1.view_price_products)();
        let categories = yield (0, view_1.view_categories)();
        let categoriesByProductsPrice = [];
        products.forEach((product) => {
            const filteredCategories = categories.filter((category) => category.fk_product_category_id_product === product.id_product);
            product.categories = filteredCategories;
            categoriesByProductsPrice.push(product);
        });
        if (products) {
            res.status(200).json({ categoriesByProductsPrice });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.get_view_price_products = get_view_price_products;
const get_view_grocers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { document_provider } = req.body;
        let grocers = yield (0, view_1.view_grocers)(document_provider);
        if (grocers) {
            res.status(200).json({ grocers });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.get_view_grocers = get_view_grocers;
