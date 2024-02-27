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
const validationImage = (image, nameProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const api = 'AIzaSyCxPWjdB-YfhmAvLPku3Q62soGovC9R72o';
    const genAI = new generative_ai_1.GoogleGenerativeAI(api);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });  
        const prompt = `La imagen insertada hace referencia a la descripcion de "${nameProduct}", dime "SI" si hace referencia, o "NO" para indicarme que no hace referencia`;
        console.log(prompt);
        const result = yield model.generateContent([prompt, image]);
        const response = yield result.response;
        const text = response.text();
        console.log(`4444444444444${text}___`);
        if (text == "  SI") {
            console.log("111111111111111");
            return "Si hace referencia";
        }
        else if (text === "NO") {
            console.log("22222222222222");
            return 'NO SE PUDO';
        }
    }
    catch (error) {
        return error;
    }
});
exports.validationImage = validationImage;
