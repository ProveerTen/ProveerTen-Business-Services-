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
exports.createPublication = void 0;
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Publication_1 = __importDefault(require("../models/Publication"));
const auth_token_1 = require("../middlewares/auth-token");
const createPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const result = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const newPublication = {
            _id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename.slice(0, (_c = req.file) === null || _c === void 0 ? void 0 : _c.filename.lastIndexOf('.')),
            text: req.body.text,
            imagePath: (_d = req.file) === null || _d === void 0 ? void 0 : _d.path,
            nit_company: auth_token_1.dataDecoded.id,
            image_url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id
        };
        const publication = new Publication_1.default(newPublication);
        yield publication.save();
        fs_extra_1.default.unlink((_e = req.file) === null || _e === void 0 ? void 0 : _e.path);
        res.status(200).json({
            message: 'Publication successfully saved',
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
});
exports.createPublication = createPublication;
