"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search-controller");
const router = (0, express_1.Router)();
router.post('/value', search_controller_1.getProductsByName);
router.get('/categories', search_controller_1.getProductsByCategories);
exports.default = router;
