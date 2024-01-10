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
exports.deleteProvider = void 0;
const provider_1 = require("../services/provider");
const deleteProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const document_provider = req.params.document;
    try {
        (0, provider_1.verifyProvider)(document_provider, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (!result) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            try {
                (0, provider_1.providerDelete)(document_provider, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    if (results) {
                        return res.status(200).json({ message: "Proveedor eliminado correctamente" });
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ error: "Error interno al eliminar el proveedor" });
            }
        }));
    }
    catch (error) {
        return res.status(500).json({ error: "Error al buscar el proveedor" });
    }
});
exports.deleteProvider = deleteProvider;
