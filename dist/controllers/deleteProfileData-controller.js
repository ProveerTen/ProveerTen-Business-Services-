"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataProfile = void 0;
const auth_token_1 = require("../middlewares/auth-token");
const delete_profileData_service_1 = __importDefault(require("../services/delete-profileData-service"));
const deleteDataProfile = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        delete_profileData_service_1.default.deleteDataProfile(credentials, req.query, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to delete data profile": error });
    }
};
exports.deleteDataProfile = deleteDataProfile;
