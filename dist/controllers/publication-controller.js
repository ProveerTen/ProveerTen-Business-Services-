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
exports.updateDataPublication = void 0;
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Publication_1 = __importDefault(require("../models/Publication"));
const updateDataPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { text, id } = req.body;
        let publication = yield Publication_1.default.findById(id);
        let oldPublic_id = publication === null || publication === void 0 ? void 0 : publication.public_id;
        if (req.file == null) {
            yield Publication_1.default.updateOne({ _id: id }, { $set: { text } });
        }
        if (req.file != null) {
            const result = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
            if (!result) {
                res.status(400).json({ "error": "error subiendo la imagen" });
            }
            yield Publication_1.default.updateOne({ _id: id }, { $set: { text: text, image_url: result.url, secure_url: result.secure_url, public_id: result.public_id } });
            fs_extra_1.default.unlink((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
            if (oldPublic_id) {
                yield cloudinary_1.default.uploader.destroy(oldPublic_id);
            }
        }
        publication = yield Publication_1.default.findById(id); //esto es de prueba
        res.status(200).json({ message: 'Publication successfully saved', publication });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error });
    }
});
exports.updateDataPublication = updateDataPublication;
