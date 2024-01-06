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
const fs_extra_1 = __importDefault(require("fs-extra"));
const db_config_1 = __importDefault(require("../config/db-config"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary-config"));
const delete_profileData_service_1 = __importDefault(require("../services/delete-profileData-service"));
let updateQuery, updateValues;
let oldImageUrl, urlValuesToUpdate;
let resultCloudinary, photo_url, publicId;
let fieldName;
const updatePhotoCompany = (dataToken, photoToUpdate, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, email, id } = dataToken;
        fieldName = photoToUpdate.fieldname;
        console.log("req.file", photoToUpdate);
        if (photoToUpdate !== undefined) {
            try {
                resultCloudinary = yield cloudinary_config_1.default.uploader.upload(photoToUpdate.path);
                // { folder: 'tu-carpeta-en-cloudinary' }
                photo_url = resultCloudinary.secure_url;
                console.log(photoToUpdate.path);
                console.log(resultCloudinary);
                console.log("profile_photo_provider ", photo_url);
            }
            catch (error) {
                console.log(error);
                callback({ "error": "error subiendo imagen" });
            }
        }
        console.log("fielName", fieldName);
        updateQuery = `UPDATE company SET ?? = ? WHERE nit_company = ?`;
        updateValues = [fieldName, photo_url, id];
        oldImageUrl = `select ?? from company WHERE nit_company = ?`;
        urlValuesToUpdate = [fieldName, id];
        publicId = yield delete_profileData_service_1.default.deleteOldImage(oldImageUrl, urlValuesToUpdate, fieldName);
        db_config_1.default.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                let urlFailedInsert = resultCloudinary.public_id;
                console.log("urlFailedInsert", urlFailedInsert);
                callback({ "Error al actualizar la imagen de la compañia": err });
                if (urlFailedInsert) {
                    yield cloudinary_config_1.default.uploader.destroy(urlFailedInsert);
                }
            }
            else {
                console.log("exito");
                callback(null, { "imagen actualizada con éxito": photo_url });
                if (publicId) {
                    yield cloudinary_config_1.default.uploader.destroy(publicId);
                }
                fs_extra_1.default.unlink(photoToUpdate.path);
            }
        }));
    }
    catch (error) {
        return callback(error);
    }
});
const updatePhotoProvider = (dataToken, photoToUpdate, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, email, id } = dataToken;
        fieldName = photoToUpdate.fieldname;
        console.log("req.file", photoToUpdate);
        if (photoToUpdate !== undefined) {
            try {
                resultCloudinary = yield cloudinary_config_1.default.uploader.upload(photoToUpdate.path);
                photo_url = resultCloudinary.secure_url;
                console.log(photoToUpdate.path);
                console.log(resultCloudinary);
                console.log("photo ", photo_url);
            }
            catch (error) {
                callback({ "error subiendo imagen": error });
            }
        }
        console.log("fielName", fieldName);
        updateQuery = `UPDATE provider SET ?? = ? WHERE document_provider = ?`;
        updateValues = [fieldName, photo_url, id];
        oldImageUrl = `select ?? from provider WHERE document_provider = ?`;
        urlValuesToUpdate = [fieldName, id];
        let publicId = yield delete_profileData_service_1.default.deleteOldImage(oldImageUrl, urlValuesToUpdate, fieldName);
        db_config_1.default.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                let urlFailedInsert = resultCloudinary.public_id;
                console.log("urlFailedInsert", urlFailedInsert);
                callback({ "Error al actualizar la imagen del provider": err });
                if (urlFailedInsert) {
                    yield cloudinary_config_1.default.uploader.destroy(urlFailedInsert);
                }
            }
            else {
                console.log("exito");
                callback(null, { "imagen actualizada con éxito": photo_url });
                if (publicId) {
                    yield cloudinary_config_1.default.uploader.destroy(publicId);
                }
                fs_extra_1.default.unlink(photoToUpdate.path);
            }
        }));
    }
    catch (error) {
        return callback(error);
    }
});
const updatePhotoGrocer = (dataToken, photoToUpdate, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, email, id } = dataToken;
        fieldName = photoToUpdate.fieldname;
        console.log("req.file", photoToUpdate);
        if (photoToUpdate !== undefined) {
            try {
                resultCloudinary = yield cloudinary_config_1.default.uploader.upload(photoToUpdate.path);
                photo_url = resultCloudinary.secure_url;
                console.log(photoToUpdate.path);
                console.log(resultCloudinary);
                console.log("photo ", photo_url);
            }
            catch (error) {
                callback({ "error subiendo imagen": error });
            }
        }
        console.log("fielName", fieldName);
        updateQuery = `UPDATE grocer SET ?? = ? WHERE document_grocer = ?`;
        updateValues = [fieldName, photo_url, id];
        oldImageUrl = `select ?? from grocer WHERE document_grocer = ?`;
        urlValuesToUpdate = [fieldName, id];
        let publicId = yield delete_profileData_service_1.default.deleteOldImage(oldImageUrl, urlValuesToUpdate, fieldName);
        db_config_1.default.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                let urlFailedInsert = resultCloudinary.public_id;
                console.log("urlFailedInsert", urlFailedInsert);
                callback({ "Error al actualizar imagen del grocer": err });
                if (urlFailedInsert) {
                    yield cloudinary_config_1.default.uploader.destroy(urlFailedInsert);
                }
            }
            else {
                console.log("exito");
                callback(null, { "imagen actualizada con éxito": photo_url });
                console.log("publicId", publicId);
                if (publicId) {
                    yield cloudinary_config_1.default.uploader.destroy(publicId);
                }
                fs_extra_1.default.unlink(photoToUpdate.path);
            }
        }));
    }
    catch (error) {
        return callback(error);
    }
});
exports.default = {
    updatePhotoCompany,
    updatePhotoProvider,
    updatePhotoGrocer
};
