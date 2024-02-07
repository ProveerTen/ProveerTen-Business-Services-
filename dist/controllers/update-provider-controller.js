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
exports.updateProviderPassword = exports.updateProvider = void 0;
const profile_service_1 = __importDefault(require("../services/profile-service"));
const update_profile_service_1 = __importDefault(require("../services/update-profile-service"));
const changePassword_service_1 = require("../services/changePassword-service");
const auth_token_1 = require("../middlewares/auth-token");
const updateProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_provider, document_provider } = req.body;
        let result = yield profile_service_1.default.getProviderByCompany(auth_token_1.dataDecoded.id, document_provider);
        if (result.length == 0) {
            return res.status(404).json({ Status: 'Error' });
        }
        let data = {
            email: email_provider,
            role: 'provider',
            id: document_provider
        };
        update_profile_service_1.default.updateDataProvider(data, req.body, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.updateProvider = updateProvider;
const updateProviderPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('a');
    try {
        const { email_provider, document_provider } = req.body;
        console.log(email_provider);
        console.log(document_provider);
        console.log(req.body.password_provider);
        let result = yield profile_service_1.default.getProviderByCompany(auth_token_1.dataDecoded.id, document_provider);
        if (result.length == 0) {
            return res.status(404).json({ Status: 'Error' });
        }
        let data = {
            email: email_provider,
            role: 'provider',
            id: document_provider
        };
        (0, changePassword_service_1.changePassProvider)(data, req.body, (error, results) => {
            if (error) {
                res.status(500).json({ "error-controller": error });
            }
            if (results) {
                res.status(200).json({ "Status": "oki", "result": results });
            }
        });
    }
    catch (error) {
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.updateProviderPassword = updateProviderPassword;
