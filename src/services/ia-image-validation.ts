import { GoogleGenerativeAI } from "@google/generative-ai";

export const validationImage = (image:any, nameProduct:string) => {
    return new Promise(async (resolve, reject) => {
      const api = 'AIzaSyCxPWjdB-YfhmAvLPku3Q62soGovC9R72o';
      const genAI = new GoogleGenerativeAI(api);
  
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); 
        const prompt = `La imagen contiene contenido explícito o potencialmente perjudicial visual y emocionalmente para una persona, o contiene lenceria ? Responde con SÍ si lo tiene, o NO si no lo tiene.`;
        console.log(prompt);
  
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const text = response.text().trim();

        console.log(result.response.text);
        

        console.log(`Respuesta del modelo: ${text}`);
  
        if (text === "NO") {
          resolve(false);
        } else if (text === "SÍ") {
          resolve(true);
        } else {
          reject("Respuesta no reconocida");
        }
      } catch (error) {
        
        console.error("Error en la validación de la imagen:", error);
        reject(error);
      }
    });
  };