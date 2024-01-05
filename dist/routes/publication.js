"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_controller_1 = require("../controllers/publication-controller");
const multer_1 = __importDefault(require("../libs/multer"));
const auth_token_1 = require("../middlewares/auth-token");
const router = (0, express_1.Router)();
router.post('/create', auth_token_1.verifyToken, multer_1.default.single('image'), publication_controller_1.createPublication);
router.patch('/update');
router.delete('/delete');
exports.default = router;
