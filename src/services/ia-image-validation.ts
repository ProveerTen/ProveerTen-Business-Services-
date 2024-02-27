import { GoogleGenerativeAI } from "@google/generative-ai";


export  const validationImage = async (image: any, nameProduct: any)  =>{

    

  const api: any = 'AIzaSyCxPWjdB-YfhmAvLPku3Q62soGovC9R72o'
  const genAI = new GoogleGenerativeAI(api);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); 

    // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });  
    const prompt = `La imagen insertada hace referencia a la descripcion de "${nameProduct}", dime "SI" si hace referencia, o "NO" para indicarme que no hace referencia`;

    console.log(prompt);
    
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();

    console.log(`4444444444444${text}___`);
    

        if (text == "  SI"){
            console.log("111111111111111");
            
            return "Si hace referencia";
        }
        else if (text === "NO") {
            console.log("22222222222222");

            return 'NO SE PUDO'
        }

    } catch (error) {
            return error
    }



}
