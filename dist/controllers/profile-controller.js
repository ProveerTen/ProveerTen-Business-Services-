"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grocer = exports.provider = exports.company = void 0;
const profile_service_1 = __importDefault(require("../services/profile-service"));
const company = (req, res) => {
    let { nit_company } = req.body;
    const query = 'call get_data_profile_company(?);';
    profile_service_1.default.profileService(query, nit_company, (error, data) => {
        if (error) {
            res.status(500).json({ "error": error.message });
        }
        else {
            if (data) {
                res.status(200).json({ status: 'Ok data', data });
            }
            else {
                return res.status(404).json({ Status: 'Error' });
            }
        }
    });
};
exports.company = company;
const provider = (req, res) => {
    let { document_provider } = req.body;
    const query = 'call get_data_profile_provider(?);';
    profile_service_1.default.profileService(query, document_provider, (error, data) => {
        if (error) {
            res.status(500).json({ "error": error.message });
        }
        else {
            if (data) {
                res.status(200).json({ status: 'Ok data', data });
            }
            else {
                return res.status(404).json({ Status: 'Error' });
            }
        }
    });
};
exports.provider = provider;
const grocer = (req, res) => {
    let { document_grocer } = req.body;
    const query = 'call get_data_profile_grocer(?);';
    profile_service_1.default.profileService(query, document_grocer, (error, data) => {
        if (error) {
            res.status(500).json({ "error": error.message });
        }
        else {
            if (data) {
                res.status(200).json({ status: 'Ok data', data });
            }
            else {
                return res.status(404).json({ Status: 'Error' });
            }
        }
    });
};
exports.grocer = grocer;
