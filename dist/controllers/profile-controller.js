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
exports.dataCompanies = exports.grocer = exports.allCompanies = exports.providers = exports.companies = exports.grocers = exports.provider = exports.company = void 0;
const profile_service_1 = __importDefault(require("../services/profile-service"));
const auth_token_1 = require("../middlewares/auth-token");
const company = (req, res) => {
    let { id } = auth_token_1.dataDecoded;
    const query = 'call get_data_profile_company(?);';
    profile_service_1.default.profileService(query, id, (error, data) => {
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
    let { id } = auth_token_1.dataDecoded;
    const query = 'call get_data_profile_provider(?);';
    profile_service_1.default.profileService(query, id, (error, data) => {
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
const grocers = (req, res) => {
    let { id } = req.params;
    const query = 'call get_data_profile_grocer(?);';
    profile_service_1.default.profileService(query, id, (error, data) => {
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
exports.grocers = grocers;
const companies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        if (auth_token_1.dataDecoded.role === 'provider') {
            let result = yield profile_service_1.default.getCompanyByProvider(auth_token_1.dataDecoded.id, id);
            if (result.length == 0) {
                return res.status(404).json({ Status: 'Error' });
            }
        }
        const query = 'call get_data_profile_company(?);';
        profile_service_1.default.profileService(query, id, (error, data) => {
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
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.companies = companies;
const providers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        if (auth_token_1.dataDecoded.role === 'company') {
            console.log(req.params);
            console.log(auth_token_1.dataDecoded.id);
            let result = yield profile_service_1.default.getProviderByCompany(auth_token_1.dataDecoded.id, id);
            console.log('a');
            if (result.length == 0) {
                console.log('b');
                return res.status(404).json({ Status: 'Error' });
            }
        }
        const query = 'call get_data_profile_provider(?);';
        profile_service_1.default.profileService(query, id, (error, data) => {
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
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.providers = providers;
const allCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'select nit_company, name_company, profile_photo_company from company';
        profile_service_1.default._allcompanies(query, (error, data) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            }
            else {
                if (data) {
                    res.status(200).json({ status: 'Ok data', data });
                }
            }
        });
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.allCompanies = allCompanies;
const grocer = (req, res) => {
    let { id } = auth_token_1.dataDecoded;
    const query = 'call get_data_profile_grocer(?);';
    profile_service_1.default.profileService(query, id, (error, data) => {
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
const dataCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        console.log('2');
        const query = 'call get_data_profile_company(?);';
        profile_service_1.default.profileService(query, id, (error, data) => {
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
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.dataCompanies = dataCompanies;
