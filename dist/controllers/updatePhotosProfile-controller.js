"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchPhotoGrocer = exports.patchPhotoProvider = exports.patchPhotoCompany = void 0;
const auth_token_1 = require("../middlewares/auth-token");
const update_profilePhotos_service_1 = __importDefault(require("../services/update-profilePhotos-service"));
const patchPhotoCompany = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        update_profilePhotos_service_1.default.updatePhotoCompany(credentials, req.file, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to update photo profile company": error });
    }
};
exports.patchPhotoCompany = patchPhotoCompany;
const patchPhotoProvider = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        update_profilePhotos_service_1.default.updatePhotoProvider(credentials, req.file, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to update photo profile provider": error });
    }
};
exports.patchPhotoProvider = patchPhotoProvider;
const patchPhotoGrocer = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        update_profilePhotos_service_1.default.updatePhotoGrocer(credentials, req.file, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to update photo profile grocer": error });
    }
};
exports.patchPhotoGrocer = patchPhotoGrocer;
