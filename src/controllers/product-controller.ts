import { validateRole } from './../middlewares/auth-role';

import { Request, Response } from "express";
import fs from 'fs-extra';

import cloudinary from '../libs/cloudinary';
import Product from '../models/Product';
import {
  get_name_company, insert_product,
  insert_product_category, delete_product,
  delete_product_category, deleteOldImage,
  verifyExistProduct, updateDataProduct, get_product_price, insert_suggest_product_price, get_product, delete_product_suggested
} from "../services/product";
import { dataDecoded } from "../middlewares/auth-token";
import { view_categories } from "../services/view";
import generateRandomString from "../helpers/generate-string";
import { validationImage } from "../services/ia-image-validation";


function fileToGenerativePart(path:any, mimeType:any) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}



export const createProduct = async (req: Request, res: Response) => {

  let image: string;
  let result_cloudinary: any;

  try {

    const {
      name_product,
      description_product,
      purchase_price_product,
      unit_purchase_price_product,
      suggested_unit_selling_price_product,
      purchase_quantity,
      stock_product,
      content_product,
      availability_product,
      categories
    } = req.body;

    let name_company = await get_name_company(dataDecoded.id) + '_' + name_product.replace(/\s/g, '_');

    let id_product = name_company + '_' + generateRandomString(5);

    console.log(req.file);
    

    if (req.file?.path!) {
      
  
      
      
      
      result_cloudinary = await cloudinary.uploader.upload(req.file?.path!);
      image = result_cloudinary.secure_url;
      fs.unlink(req.file.path);
    }
    
    const data: Product = {
      id_product,
      name_product,
      description_product,
      purchase_price_product,
      unit_purchase_price_product,
      suggested_unit_selling_price_product,
      purchase_quantity,
      stock_product,
      content_product,
      image_product: image!,
      availability_product,
      fk_product_nit_company: dataDecoded.id
    }
    
    await insert_product(data);
    
    insert_product_category(id_product, categories);
    
    res.status(200).json({ message: 'Ok' })
    
  } catch (error) {
    if (result_cloudinary.public_id) {
      await cloudinary.uploader.destroy(result_cloudinary.public_id)
    }
    console.log('Error');
    res.status(400).json(error)
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  
  try {
    const { id_product } = req.body
    
    let oldImageUrl = 'select image_product from product WHERE id_product = ?';
    
    const public_id_clou = await deleteOldImage(oldImageUrl, id_product, 'image_product')
    console.log("public_id_clou", public_id_clou);
    
    await delete_product_category(id_product);
    await delete_product_suggested(id_product);
    await delete_product(id_product);
    
    if (public_id_clou) {
      await cloudinary.uploader.destroy(public_id_clou);
    }
    
    res.status(200).json({ message: 'Ok, producto eliminado con exito' })
    
  } catch (error) {
    res.status(400).json({ error })
  }
}



// export const updateProduct = async (req: Request, res: Response) => {
//   let id_product = req.body.id_product;
//   let resultC: any;
//   let imageNew: string;
  
  
//   try {
//     let dataProduct = await verifyExistProduct(id_product);
    
    
//     let imageSaveDb = dataProduct[0].image_product;
  


//     if (req.file?.path!) {
      
//       const imageParts = [
//         fileToGenerativePart(req.file?.path!, req.file?.mimetype)
//       ];
      
//   let validaImage = await validationImage(imageParts, "Crema dental Colgate")
//   .then((mensaje) => {
//     console.log(mensaje);
//   })
//   .catch((error) => {
//     console.error("Error en la validación de la imagen:", error);
//   });
      

      
      
//       console.log(req.file.path!);
//       await cloudinary.uploader.destroy(imageSaveDb);
//       resultC = await cloudinary.uploader.upload(req.file?.path!);
//       console.log("Foto");
//       imageNew = resultC.secure_url;
      //  await fs.unlink(req.file.path);
//     }


//     const {
//       name_product,
//       description_product,
//       purchase_price_product,
//       unit_purchase_price_product,
//       suggested_unit_selling_price_product,
//       purchase_quantity,
//       stock_product,
//       content_product,
//       availability_product,
//     } = req.body;

//     const data: Product = {
//       id_product,
//       name_product,
//       description_product,
//       purchase_price_product,
//       unit_purchase_price_product,
//       suggested_unit_selling_price_product,
//       purchase_quantity,
//       stock_product,
//       content_product,
//       image_product: imageNew! || imageSaveDb,
//       availability_product,
//       fk_product_nit_company: dataDecoded.id,
//     };
//     await updateDataProduct(data);
//     res.status(200).json({ updateProduct: true, message: "Ok" });

//   } catch (error) {
//     if (resultC && resultC.public_id) {
//       await cloudinary.uploader.destroy(resultC.public_id);
//     }
//     res.status(400).json({ error: "Error al actualizar el producto" });
//   }
// };


export const updateProduct = async (req: Request, res: Response) => {
  let id_product = req.body.id_product;
  let resultC: any;
  let imageNew: string;
  
  try {
    let dataProduct = await verifyExistProduct(id_product);
    let imageSaveDb = dataProduct[0].image_product;

    if (req.file?.path!) {
      const imageParts = [
        fileToGenerativePart(req.file?.path!, req.file?.mimetype)
      ];
      
      let isValidImage = await validationImage(imageParts, "Crema dental Colgate");
      
      if (isValidImage) {
        return res.status(400).json({ error: "La imagen no corresponde al producto esperado." });
      }

      await cloudinary.uploader.destroy(imageSaveDb);
      resultC = await cloudinary.uploader.upload(req.file?.path!);
      imageNew = resultC.secure_url;
    }

    const { name_product, description_product, purchase_price_product, unit_purchase_price_product, suggested_unit_selling_price_product, purchase_quantity, stock_product, content_product, availability_product } = req.body;

    const data: Product = {
      id_product,
      name_product,
      description_product,
      purchase_price_product,
      unit_purchase_price_product,
      suggested_unit_selling_price_product,
      purchase_quantity,
      stock_product,
      content_product,
      image_product: imageNew! || imageSaveDb,
      availability_product,
      fk_product_nit_company: dataDecoded.id,
    };

    await updateDataProduct(data);
    res.status(200).json({ updateProduct: true, message: "Ok" });
    await fs.unlink(req.file?.path!);

  } catch (error) {
    if (resultC && resultC.public_id) {
      await cloudinary.uploader.destroy(resultC.public_id);
    }
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
};

export const suggest_product_price = async (req: Request, res: Response) => {

  try {

    let {
      id_product,
      document_grocer,
      suggested_price_product
    } = req.body;

    let get_price: any = await get_product_price(id_product)
    let price: any = get_price.suggested_unit_selling_price_product


    let range = (price * 0.5) + price;

    if (range > suggested_price_product && price < suggested_price_product) {
      insert_suggest_product_price(id_product, document_grocer, suggested_price_product).then((mensaje: any) => {
        res.status(200).json({ message: mensaje[0].message_text });
      }).catch((error: any) => { res.status(500).json({ message: error.sqlMessage }); })
    } else {
      res.status(400).json({ "message": "the price value must be between " + price + " and " + range })
    }

  } catch (error) {
    res.status(500).json(error)
  }

};


export const product = async (req: Request, res: Response) => {
  let { id_product } = req.body;

  try {
    let products: any = await get_product(id_product)
    let product = products[0][0];
    let categories = await view_categories();

    let categoriesByProducts: any[] = [];

    const filteredCategories = categories.filter((category: any) => category.fk_product_category_id_product === product.id_product).map((filteredCategory: any) => (filteredCategory.fk_product_category_name_category));

    product.categories = filteredCategories;
    categoriesByProducts.push(product)

    
    console.log("product___", product);
    console.log("categories___", categories);
    console.log("filteredCategories", filteredCategories);
    console.log("final", categoriesByProducts[0]);

    if (product) {
      res.status(200).json({ categoriesByProducts });
    }

  } catch (error) {
    res.status(400).json({
      error
    })
  }
}
