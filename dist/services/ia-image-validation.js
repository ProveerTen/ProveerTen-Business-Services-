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
exports.validationImage = void 0;
const generative_ai_1 = require("@google/generative-ai");
const validationImage = (image, nameProduct) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const api = 'AIzaSyCxPWjdB-YfhmAvLPku3Q62soGovC9R72o';
        const genAI = new generative_ai_1.GoogleGenerativeAI(api);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
            const prompt = `La imagen contiene contenido explícito o potencialmente perjudicial visual y emocionalmente para una persona, o contiene lenceria ? Responde con SÍ si lo tiene, o NO si no lo tiene.`;
            console.log(prompt);
            const result = yield model.generateContent([prompt, image]);
            const response = yield result.response;
            const text = response.text().trim();
            console.log(result.response.text);
            console.log(`Respuesta del modelo: ${text}`);
            if (text === "NO") {
                resolve(false);
            }
            else if (text === "SÍ") {
                resolve(true);
            }
            else {
                reject("Respuesta no reconocida");
            }
        }
        catch (error) {
            console.error("Error en la validación de la imagen:", error);
            reject(error);
        }
    }));
};
exports.validationImage = validationImage;
