import { Request, Response } from 'express';
import cloudinary from '../libs/cloudinary';
import fs from 'fs-extra';

import Publication from '../models/Publication';
import { dataDecoded } from '../middlewares/auth-token';
import { get_publication_location, view_publication_location } from '../services/view';

export const createPublication = async (req: Request, res: Response) => {
    try {

        const result = await cloudinary.uploader.upload(req.file?.path!, { resource_type: 'auto' });

        const newPublication = {
            _id: req.file?.filename.slice(0, req.file?.filename.lastIndexOf('.')),
            text: req.body.text,
            imagePath: req.file?.path,
            nit_company: dataDecoded.id,
            image_url: result?.url,
            secure_url: result?.secure_url,
            public_id: result?.public_id,
            date: req.body.date
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

export const deleteOnePublication = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({ error: 'Publication not found' });
        }

        const public_id = publication.public_id;

        await Publication.findByIdAndDelete(id);

        await cloudinary.uploader.destroy(public_id);

        res.status(200).json({
            message: 'Publication successfully deleted'
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
};

export const getPublicationById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const publication = await Publication.findById(id);

        res.status(200).json({
            publication
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
};

export const getPublicationsByCompany = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        console.log("ED", id);


        const publications = await Publication.find({ nit_company: id });
        console.log(publications);


        res.status(200).json({
            publications
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
};

export const getAllPublications = async (req: Request, res: Response) => {

    try {  
        const { document_grocer } = req.body;  

        let nits_companies = await get_publication_location(document_grocer);

        const publications = await Publication.find({ nit_company: { $in: nits_companies } });

        res.status(200).json({
            publications
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
};

export const getAllPublicationsByLocation = async (req: Request, res: Response) => {

    try {

        let { city, deparment } = req.body;
        console.log(req.body);

        let nits_companies = await view_publication_location(city, deparment);

        const publications = await Publication.find({ nit_company: { $in: nits_companies } });

        res.status(200).json({
            publications
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: `error`
        });
    }
};

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
        res.status(200).json({ message: 'Publication successfully update', publication })

    } catch (error) {
        console.log(error);
        res.status(400).json({ "error": error });
    }
}

