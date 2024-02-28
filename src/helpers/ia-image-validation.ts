import { GoogleGenerativeAI } from "@google/generative-ai";

export const validationImage = (image:any, promptValue:string) => {
    return new Promise(async (resolve, reject) => {
      const api = 'AIzaSyCxPWjdB-YfhmAvLPku3Q62soGovC9R72o';
      const genAI = new GoogleGenerativeAI(api);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); 
        // const prompt = ``;
        const result = await model.generateContent([promptValue, image]);
        const response = await result.response;
        const text = response.text().trim();

        console.log(result.response.text);

        console.log(`Respuesta del modelo: ${text}`);
  
        if (text === "SÍ") {
         return resolve(true);
        } else if (text === "NO") {
          return resolve(false);
        } else {
         return reject("Respuesta no reconocida");
        }
      } catch (error) {
        console.error("Error en la validación de la imagen:", error);
        reject(error);
      }
    });
  };