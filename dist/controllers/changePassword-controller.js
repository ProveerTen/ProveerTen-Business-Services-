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
exports.changePasswordGrocer = exports.changePasswordProvider = exports.changePasswordCompany = void 0;
const auth_token_1 = require("../middlewares/auth-token");
const changePassword_service_1 = require("../services/changePassword-service");
const changePasswordCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        let oldPassword = req.body.old_password, newPassword = req.body.new_password;
        let newData = { oldPassword, newPassword };
        (0, changePassword_service_1.changePasswordCompany_)(credentials, newData, (err, result) => {
            if (err) {
                res.status(500).json({ "error": err });
            }
            if (result) {
                res.status(200).json({ "Status": "oki", "result": result });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to change password company": error });
    }
});
exports.changePasswordCompany = changePasswordCompany;
const changePasswordProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        let oldPassword = req.body.old_password, newPassword = req.body.new_password;
        let newData = { oldPassword, newPassword };
        (0, changePassword_service_1.changePasswordProvider_)(credentials, newData, (err, result) => {
            if (err) {
                res.status(500).json({ "error": err });
            }
            if (result) {
                res.status(200).json({ "Status": "oki", "result": result });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to change password provider": error });
    }
});
exports.changePasswordProvider = changePasswordProvider;
const changePasswordGrocer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        let oldPassword = req.body.old_password, newPassword = req.body.new_password;
        let newData = { oldPassword, newPassword };
        if (email !== undefined) {
            (0, changePassword_service_1.changePasswordGrocer_)(credentials, newData, (err, result) => {
                if (err) {
                    res.status(500).json({ "error": err });
                }
                if (result) {
                    res.status(200).json({ "Status": "oki", "result": result });
                }
            });
        }
        else {
            res.status(500).json({ "error": "Datos no encontrados para la lectura" });
        }
    }
    catch (error) {
        res.status(500).json({ "failed to change password grocer": error });
    }
});
exports.changePasswordGrocer = changePasswordGrocer;
