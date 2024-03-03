"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSocialRed = exports.getSocialRedByCompany = exports.getSocialRed = exports.addSocialRed = exports.getData = exports.patchGrocer = exports.patchProvider = exports.patchCompany = void 0;
const update_profile_service_1 = __importDefault(require("../services/update-profile-service"));
const auth_token_1 = require("../middlewares/auth-token");
const patchCompany = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        update_profile_service_1.default.updateDataCompany(credentials, req.body, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to update profile company": error });
    }
};
exports.patchCompany = patchCompany;
const patchProvider = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        update_profile_service_1.default.updateDataProvider(credentials, req.body, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to update profile provider": error });
    }
};
exports.patchProvider = patchProvider;
const patchGrocer = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        let credentials = {
            email,
            role,
            id
        };
        update_profile_service_1.default.updateDataGrocer(credentials, req.body, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to update profile grocer": error });
    }
};
exports.patchGrocer = patchGrocer;
// esto es para ver el pefil ignorar
const getData = (req, res) => {
    try {
        const { email, role, id } = auth_token_1.dataDecoded;
        //nombre de la pk cambiarla segun la necesidad call get_data_profile_company(?), call get_data_profile_provider(?), call get_data_profile_grocer(?)
        update_profile_service_1.default.getCurrentData('call get_data_profile_grocer(?)', id, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ "failed to view profile user": error });
    }
};
exports.getData = getData;
const addSocialRed = (req, res) => {
    try {
        update_profile_service_1.default.addSocialRed(req.body, (error, results) => {
            if (error) {
                res.status(500).json({ error });
            }
            if (results) {
                res.status(200).json({ "Status": results });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "failed to add social red": error });
    }
};
exports.addSocialRed = addSocialRed;
const getSocialRed = (req, res) => {
    const { email, role, id } = auth_token_1.dataDecoded;
    try {
        update_profile_service_1.default.getSocialRed(id, (error, results) => {
            if (error) {
                res.status(500).json({ error });
            }
            if (results) {
                res.status(200).json({ "status": results });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "failed to add social red": error });
    }
};
exports.getSocialRed = getSocialRed;
const getSocialRedByCompany = (req, res) => {
    let { id } = req.params;
    try {
        update_profile_service_1.default.getSocialRed(id, (error, results) => {
            if (error) {
                res.status(500).json({ error });
            }
            if (results) {
                res.status(200).json({ "status": results });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "failed to add social red": error });
    }
};
exports.getSocialRedByCompany = getSocialRedByCompany;
const deleteSocialRed = (req, res) => {
    const { email, role, id } = auth_token_1.dataDecoded;
    try {
        update_profile_service_1.default.deleteSocialRed(id, req.query, (error, results) => {
            if (error) {
                res.status(500).json({ error });
            }
            if (results) {
                res.status(200).json({ "status": results });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "failed to add social red": error });
    }
};
exports.deleteSocialRed = deleteSocialRed;
