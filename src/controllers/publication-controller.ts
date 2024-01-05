import { Request, Response } from 'express';
import cloudinary from '../libs/cloudinary';
import fs from 'fs-extra';

import Publication from '../models/Publication';
import { dataDecoded } from '../middlewares/auth-token';

export const createPublication = async (req: Request, res: Response) => {
    try {

        const result = await cloudinary.uploader.upload(req.file?.path!);

        const newPublication = {
            _id: req.file?.filename.slice(0, req.file?.filename.lastIndexOf('.')),
            text: req.body.text,
            imagePath: req.file?.path,
            nit_company: dataDecoded.id,
            image_url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id
        }

        const publication = new Publication(newPublication);

        await publication.save();

        fs.unlink(req.file?.path!);

        res.status(200).json({
            message: 'Publication successfully saved',
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
};
