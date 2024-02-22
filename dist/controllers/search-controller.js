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
exports.getCompaniesByCategories = exports.getCompaniesByName = exports.getProductsByCategories = exports.getProductsByName = void 0;
const search_service_1 = require("../services/search-service");
const getProductsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value } = req.body;
        let values = yield (0, search_service_1.getProductsByNameService)(value);
        res.status(200).json({ values });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }
});
exports.getProductsByName = getProductsByName;
const getProductsByCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.getProductsByCategories = getProductsByCategories;
const getCompaniesByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.getCompaniesByName = getCompaniesByName;
const getCompaniesByCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.getCompaniesByCategories = getCompaniesByCategories;
