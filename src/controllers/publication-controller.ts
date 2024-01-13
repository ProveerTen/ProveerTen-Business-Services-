import { Request, Response } from 'express';
import cloudinary from '../libs/cloudinary';
import fs from 'fs-extra';

import Publication from '../models/Publication';
import { dataDecoded } from '../middlewares/auth-token';


export const updateDataPublication = async (req: Request, res: Response) => {

    try {
        const { text, id } = req.body;

        let publication = await Publication.findById(id);
        let oldPublic_id: string | undefined = publication?.public_id

        if (req.file == null) {
            await Publication.updateOne({ _id: id }, { $set: { text } })
        }

        if (req.file != null) {
            const result = await cloudinary.uploader.upload(req.file?.path!);

            if (!result) {
                res.status(400).json({ "error": "error subiendo la imagen" });
            }

            await Publication.updateOne({ _id: id }, { $set: { text: text, image_url: result.url, secure_url: result.secure_url, public_id: result.public_id } })

            fs.unlink(req.file?.path!)

            if (oldPublic_id) {
                await cloudinary.uploader.destroy(oldPublic_id)
            }
        }

        publication = await Publication.findById(id); //esto es de prueba
        res.status(200).json({ message: 'Publication successfully saved', publication })

    } catch (error) {
        console.log(error);
        res.status(400).json({ "error": error });
    }
}

