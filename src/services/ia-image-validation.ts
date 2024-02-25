import { GoogleGenerativeAI } from "@google/generative-ai";


export  const validationImage = async (image: any, nameProduct: any)  =>{
  const api: any = process.env.API_KEY_IA;
  console.log(api);
  const genAI = new GoogleGenerativeAI(api);
  
  try {
    //   const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); 

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });  
    const prompt = `La imagen insertada hace referencia a la descripcion de "${nameProduct}", dime SÍ si hace referencia, o NO para indicarme que no hace referencia`;
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();
        if (text == "SÍ"){
            return "Si hace referencia";
        }
        else {
            return console.error("NO SE PUDO");
        }

    } catch (error) {
            return error
    }



}
