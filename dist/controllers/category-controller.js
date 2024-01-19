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
exports.get_categories = exports.createCategory = void 0;
const category_1 = require("../services/category");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name_category } = req.body;
        let result = yield (0, category_1.create_category)(name_category);
        if (result) {
            res.status(200).json({ result });
        }
        else {
            res.status(400).json({ message: 'Error' });
        }
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.createCategory = createCategory;
const get_categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield (0, category_1.get_names_category)();
        if (categories) {
            res.status(200).json({ categories });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.get_categories = get_categories;
