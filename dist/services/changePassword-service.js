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
exports.changePasswordGrocer_ = exports.changePasswordProvider_ = exports.changePasswordCompany_ = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
let getQuery, updatePassQuery, passwordRolDB;
const changePasswordCompany_ = (dataToken, newData, callback) => {
    const { role, email, id } = dataToken;
    let { oldPassword, newPassword } = newData;
    getQuery = `select password_company from company WHERE nit_company = ?`;
    updatePassQuery = `UPDATE company set password_company = ? WHERE nit_company = ?`;
    passwordRolDB = "password_company";
    try {
        db_mysql_1.default.query(getQuery, [id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                callback({ "Error de base de datos": err });
            }
            if (result.length > 0) {
                let passwordDB = result[0][passwordRolDB];
                const isMatch = yield bcrypt_1.default.compare(oldPassword, passwordDB);
                if (isMatch) {
                    newPassword = yield bcrypt_1.default.hash(newPassword, 10);
                    db_mysql_1.default.query(updatePassQuery, [newPassword, id], (err, result) => {
                        if (err) {
                            callback({ "Error de base de datos": err });
                        }
                        else {
                            callback(null, "Contraseña Actualizada");
                        }
                    });
                }
                else {
                    callback("la contraseña antigua no coincide");
                }
            }
            else {
                callback("Usuario no encontrado");
            }
        }));
    }
    catch (error) {
        callback({ "Error en la función changePassword company": error });
    }
};
exports.changePasswordCompany_ = changePasswordCompany_;
const changePasswordProvider_ = (dataToken, newData, callback) => {
    const { role, email, id } = dataToken;
    let { oldPassword, newPassword } = newData;
    getQuery = `select password_provider from provider WHERE document_provider = ?`;
    updatePassQuery = `UPDATE provider set password_provider = ? WHERE document_provider = ?`;
    passwordRolDB = "password_provider";
    try {
        db_mysql_1.default.query(getQuery, [id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                callback({ "Error de base de datos": err });
            }
            if (result.length > 0) {
                let passwordDB = result[0][passwordRolDB];
                const isMatch = yield bcrypt_1.default.compare(oldPassword, passwordDB);
                if (isMatch) {
                    newPassword = yield bcrypt_1.default.hash(newPassword, 10);
                    db_mysql_1.default.query(updatePassQuery, [newPassword, id], (err, result) => {
                        if (err) {
                            callback({ "Error de base de datos": err });
                        }
                        else {
                            callback(null, "Contraseña Actualizada");
                        }
                    });
                }
                else {
                    callback("la contraseña antigua no coincide");
                }
            }
            else {
                callback("Usuario no encontrado");
            }
        }));
    }
    catch (error) {
        callback({ "Error en la función changePassword provider": error });
    }
};
exports.changePasswordProvider_ = changePasswordProvider_;
const changePasswordGrocer_ = (dataToken, newData, callback) => {
    const { role, email, id } = dataToken;
    let { oldPassword, newPassword } = newData;
    getQuery = `select password_grocer from grocer WHERE document_grocer = ?`;
    updatePassQuery = `UPDATE grocer set password_grocer = ? WHERE document_grocer = ?`;
    passwordRolDB = "password_grocer";
    try {
        db_mysql_1.default.query(getQuery, [id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                callback({ "Error de base de datos": err });
            }
            if (result.length > 0) {
                let passwordDB = result[0][passwordRolDB];
                const isMatch = yield bcrypt_1.default.compare(oldPassword, passwordDB);
                if (isMatch) {
                    newPassword = yield bcrypt_1.default.hash(newPassword, 10);
                    db_mysql_1.default.query(updatePassQuery, [newPassword, id], (err, result) => {
                        if (err) {
                            callback({ "Error de base de datos": err });
                        }
                        else {
                            callback(null, "Contraseña Actualizada");
                        }
                    });
                }
                else {
                    callback("la contraseña antigua no coincide");
                }
            }
            else {
                callback("Usuario no encontrado");
            }
        }));
    }
    catch (error) {
        callback({ "Error en la función changePassword grocer": error });
    }
};
exports.changePasswordGrocer_ = changePasswordGrocer_;
