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
exports.product = exports.suggest_product_price = exports.updateProduct = exports.deleteProduct = exports.createProduct = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
const product_1 = require("../services/product");
const auth_token_1 = require("../middlewares/auth-token");
const view_1 = require("../services/view");
const generate_string_1 = __importDefault(require("../helpers/generate-string"));
const ia_image_validation_1 = require("../helpers/ia-image-validation");
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs_extra_1.default.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let image;
    let result_cloudinary;
    try {
        const { name_product, description_product, purchase_price_product, unit_purchase_price_product, suggested_unit_selling_price_product, purchase_quantity, stock_product, content_product, availability_product, categories } = req.body;
        let name_company = (yield (0, product_1.get_name_company)(auth_token_1.dataDecoded.id)) + '_' + name_product.replace(/\s/g, '_');
        let id_product = name_company + '_' + (0, generate_string_1.default)(5);
        console.log(req.file);
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            const promptValueProduct = `Evalua la imagen y dime si tiene relacion la imagen con el produto ${name_product}, responde "SÍ" si hace refenrencia al producto mencionado, resporde "NO" si no hace referencia al producto mencionado `;
            const imageParts = [
                fileToGenerativePart((_b = req.file) === null || _b === void 0 ? void 0 : _b.path, (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype)
            ];
            let isValidImage = yield (0, ia_image_validation_1.validationImage)(imageParts, promptValueProduct);
            if (!isValidImage) {
                res.status(400).json({ error: "La imagen no hace referencia al producto" });
            }
            result_cloudinary = yield cloudinary_1.default.uploader.upload((_d = req.file) === null || _d === void 0 ? void 0 : _d.path);
            image = result_cloudinary.secure_url;
            fs_extra_1.default.unlink(req.file.path);
        }
        const data = {
            id_product,
            name_product,
            description_product,
            purchase_price_product,
            unit_purchase_price_product,
            suggested_unit_selling_price_product,
            purchase_quantity,
            stock_product,
            content_product,
            image_product: image,
            availability_product,
            fk_product_nit_company: auth_token_1.dataDecoded.id
        };
        yield (0, product_1.insert_product)(data);
        (0, product_1.insert_product_category)(id_product, categories);
        res.status(200).json({ message: 'Ok' });
    }
    catch (error) {
        if (result_cloudinary.public_id) {
            yield cloudinary_1.default.uploader.destroy(result_cloudinary.public_id);
        }
        console.log('Error');
        res.status(400).json(error);
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product } = req.body;
        let oldImageUrl = 'select image_product from product WHERE id_product = ?';
        const public_id_clou = yield (0, product_1.deleteOldImage)(oldImageUrl, id_product, 'image_product');
        console.log("public_id_clou", public_id_clou);
        yield (0, product_1.delete_product_category)(id_product);
        yield (0, product_1.delete_product_suggested)(id_product);
        yield (0, product_1.delete_product)(id_product);
        if (public_id_clou) {
            yield cloudinary_1.default.uploader.destroy(public_id_clou);
        }
        res.status(200).json({ message: 'Ok, producto eliminado con exito' });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.deleteProduct = deleteProduct;
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j;
    let id_product = req.body.id_product;
    let resultC;
    let imageNew;
    try {
        let dataProduct = yield (0, product_1.verifyExistProduct)(id_product);
        let imageSaveDb = dataProduct[0].image_product;
        let imageA = (_e = req.file) === null || _e === void 0 ? void 0 : _e.path;
        const { name_product, description_product, purchase_price_product, unit_purchase_price_product, suggested_unit_selling_price_product, purchase_quantity, stock_product, content_product, availability_product } = req.body;
        if ((_f = req.file) === null || _f === void 0 ? void 0 : _f.path) {
            const promptValueProduct = `Evalua la imagen y dime si tiene relacion la imagen con el produto ${name_product}, responde "SÍ" si hace refenrencia al producto mencionado, resporde "NO" si no hace referencia al producto mencionado `;
            const imageParts = [
                fileToGenerativePart((_g = req.file) === null || _g === void 0 ? void 0 : _g.path, (_h = req.file) === null || _h === void 0 ? void 0 : _h.mimetype)
            ];
            let isValidImage = yield (0, ia_image_validation_1.validationImage)(imageParts, promptValueProduct);
            if (!isValidImage) {
                return res.status(400).json({ error: "La imagen no hace referencia al producto" });
            }
            yield cloudinary_1.default.uploader.destroy(imageSaveDb);
            resultC = yield cloudinary_1.default.uploader.upload(imageA);
            imageNew = resultC.secure_url;
        }
        const data = {
            id_product,
            name_product,
            description_product,
            purchase_price_product,
            unit_purchase_price_product,
            suggested_unit_selling_price_product,
            purchase_quantity,
            stock_product,
            content_product,
            image_product: imageNew || imageSaveDb,
            availability_product,
            fk_product_nit_company: auth_token_1.dataDecoded.id,
        };
        yield (0, product_1.updateDataProduct)(data);
        res.status(200).json({ updateProduct: true, message: "Ok" });
        yield fs_extra_1.default.unlink((_j = req.file) === null || _j === void 0 ? void 0 : _j.path);
    }
    catch (error) {
        if (resultC && resultC.public_id) {
            yield cloudinary_1.default.uploader.destroy(resultC.public_id);
        }
        res.status(400).json({ error: "Error al actualizar el producto" });
    }
});
exports.updateProduct = updateProduct;
const suggest_product_price = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id_product, document_grocer, suggested_price_product } = req.body;
        let get_price = yield (0, product_1.get_product_price)(id_product);
        let price = get_price.suggested_unit_selling_price_product;
        let range = (price * 0.5) + price;
        if (range > suggested_price_product && price < suggested_price_product) {
            (0, product_1.insert_suggest_product_price)(id_product, document_grocer, suggested_price_product).then((mensaje) => {
                res.status(200).json({ message: mensaje[0].message_text });
            }).catch((error) => { res.status(500).json({ message: error.sqlMessage }); });
        }
        else {
            res.status(400).json({ "message": "the price value must be between " + price + " and " + range });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.suggest_product_price = suggest_product_price;
const product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id_product } = req.body;
    try {
        let products = yield (0, product_1.get_product)(id_product);
        let product = products[0][0];
        let categories = yield (0, view_1.view_categories)();
        let categoriesByProducts = [];
        const filteredCategories = categories.filter((category) => category.fk_product_category_id_product === product.id_product).map((filteredCategory) => (filteredCategory.fk_product_category_name_category));
        product.categories = filteredCategories;
        categoriesByProducts.push(product);
        console.log("product___", product);
        console.log("categories___", categories);
        console.log("filteredCategories", filteredCategories);
        console.log("final", categoriesByProducts[0]);
        if (product) {
            res.status(200).json({ categoriesByProducts });
        }
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
});
exports.product = product;
