"use strict";
// const deleteOldImage = (urlImage: string, urlVaues: any, fieldName: string): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         connection.query(urlImage, urlVaues, (err, result: any[]) => {
//             if (err) {
//                 reject({"Error al consultar en la bd:": err});
//             } else {
//                 console.log("RESULT", result);
//                 let urlImagen: string | null = result[0][fieldName]
//                 console.log("urlImagen", urlImagen);
//                 if (urlImagen != null) {
//                     let split = urlImagen.split(/[./]/)
//                     console.log("Split", split);
//                     resolve(split[9]);
//                 } else {
//                     resolve(null);
//                 }
//             }
//         })
//     })
// }
