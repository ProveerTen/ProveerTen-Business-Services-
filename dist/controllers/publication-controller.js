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
exports.updateDataPublication = exports.getAllPublications = exports.getPublicationsByCompany = exports.getPublicationById = exports.deleteOnePublication = exports.createPublication = void 0;
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Publication_1 = __importDefault(require("../models/Publication"));
const auth_token_1 = require("../middlewares/auth-token");
const createPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const result = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, { resource_type: 'auto' });
        const newPublication = {
            _id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename.slice(0, (_c = req.file) === null || _c === void 0 ? void 0 : _c.filename.lastIndexOf('.')),
            text: req.body.text,
            imagePath: (_d = req.file) === null || _d === void 0 ? void 0 : _d.path,
            nit_company: auth_token_1.dataDecoded.id,
            image_url: result === null || result === void 0 ? void 0 : result.url,
            secure_url: result === null || result === void 0 ? void 0 : result.secure_url,
            public_id: result === null || result === void 0 ? void 0 : result.public_id,
            date: req.body.date
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
const deleteOnePublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const publication = yield Publication_1.default.findById(id);
        if (!publication) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        const public_id = publication.public_id;
        yield Publication_1.default.findByIdAndDelete(id);
        yield cloudinary_1.default.uploader.destroy(public_id);
        res.status(200).json({
            message: 'Publication successfully deleted'
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
});
exports.deleteOnePublication = deleteOnePublication;
const getPublicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const publication = yield Publication_1.default.findById(id);
        res.status(200).json({
            publication
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
});
exports.getPublicationById = getPublicationById;
const getPublicationsByCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("ED", id);
        const publications = yield Publication_1.default.find({ nit_company: id });
        console.log(publications);
        res.status(200).json({
            publications
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
});
exports.getPublicationsByCompany = getPublicationsByCompany;
const getAllPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publications = yield Publication_1.default.find();
        res.status(200).json({
            publications
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
});
exports.getAllPublications = getAllPublications;
const updateDataPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const { text, id } = req.body;
        let publication = yield Publication_1.default.findById(id);
        let oldPublic_id = publication === null || publication === void 0 ? void 0 : publication.public_id;
        if (req.file == null) {
            yield Publication_1.default.updateOne({ _id: id }, { $set: { text } });
        }
        if (req.file != null) {
            const result = yield cloudinary_1.default.uploader.upload((_f = req.file) === null || _f === void 0 ? void 0 : _f.path);
            if (!result) {
                res.status(400).json({ "error": "error subiendo la imagen" });
            }
            yield Publication_1.default.updateOne({ _id: id }, { $set: { text: text, image_url: result.url, secure_url: result.secure_url, public_id: result.public_id } });
            fs_extra_1.default.unlink((_g = req.file) === null || _g === void 0 ? void 0 : _g.path);
            if (oldPublic_id) {
                yield cloudinary_1.default.uploader.destroy(oldPublic_id);
            }
        }
        publication = yield Publication_1.default.findById(id); //esto es de prueba
        res.status(200).json({ message: 'Publication successfully update', publication });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error });
    }
});
exports.updateDataPublication = updateDataPublication;
