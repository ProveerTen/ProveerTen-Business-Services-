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
exports.updateProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const update_provider_1 = require("../../services/provider/update-provider");
const updateProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Controlador");
    const document = req.params.document;
    try {
        (0, update_provider_1.verifyProvider)(document, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log("11");
                return res.status(500).json({ error: error.message });
            }
            if (!result) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            try {
                const { document_provider, name_provider, last_name_provider, email_provider, password_provider, profile_photo_provider, nit_company, city_provider, neighborhood, street, number_street, number_provider } = req.body;
                const password_hash = yield bcrypt_1.default.hash(password_provider, 10);
                const data = {
                    document_provider,
                    name_provider,
                    last_name_provider,
                    email_provider,
                    password_provider: password_hash,
                    profile_photo_provider,
                    nit_company,
                    city_provider,
                    neighborhood,
                    street,
                    number_street,
                    number_provider
                };
                (0, update_provider_1.providerUpdate)(data, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    if (results) {
                        return res.status(200).json({ message: "Proveedor actualizado correctamente" });
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ error: "Error interno al actualizar el proveedor" });
            }
        }));
    }
    catch (error) {
        return res.status(500).json({ error: "Error al buscar el proveedor" });
    }
});
exports.updateProvider = updateProvider;
