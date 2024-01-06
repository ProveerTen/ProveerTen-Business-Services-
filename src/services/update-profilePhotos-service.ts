import { QueryError } from 'mysql2'
import fs from 'fs-extra'
import connection from '../config/db-config';
import Provider from '../models/provider.model';
import Grocer from '../models/grocer.model';
import Company from '../models/company.model';
import cloudinary from "../config/cloudinary-config";
import deletephotoService from '../services/delete-profileData-service'

let updateQuery: string, updateValues;
let oldImageUrl: string, urlValuesToUpdate;
let resultCloudinary: any, photo_url: string, publicId: string | null;
let fieldName: string;


const updatePhotoCompany = async (dataToken: any, photoToUpdate: any, callback: any) => {

    try {
        const { role, email, id } = dataToken;
        fieldName = photoToUpdate.fieldname

        console.log("req.file", photoToUpdate);

        if (photoToUpdate !== undefined) {
            try {
                resultCloudinary = await cloudinary.uploader.upload(photoToUpdate.path)
                // { folder: 'tu-carpeta-en-cloudinary' }
                photo_url = resultCloudinary.secure_url

                console.log(photoToUpdate.path);
                console.log(resultCloudinary);
                console.log("profile_photo_provider ", photo_url);
            } catch (error) {
                console.log(error);
                callback({ "error": "error subiendo imagen" })
            }
        }
        console.log("fielName", fieldName);

        updateQuery = `UPDATE company SET ?? = ? WHERE nit_company = ?`;
        updateValues = [fieldName, photo_url, id];

        oldImageUrl = `select ?? from company WHERE nit_company = ?`

        urlValuesToUpdate = [fieldName, id];

        publicId = await deletephotoService.deleteOldImage(oldImageUrl!, urlValuesToUpdate, fieldName)

        connection.query(updateQuery!, updateValues, async (err: QueryError | null, results) => {
            if (err) {
                let urlFailedInsert = resultCloudinary.public_id
                console.log("urlFailedInsert", urlFailedInsert);

                callback({ "Error al actualizar la imagen de la compañia": err })
                if (urlFailedInsert) {
                    await cloudinary.uploader.destroy(urlFailedInsert);
                }

            } else {
                console.log("exito");
                callback(null, { "imagen actualizada con éxito": photo_url })

                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
                fs.unlink(photoToUpdate.path)
            }
        })

    } catch (error) {
        return callback(error);
    }
}

const updatePhotoProvider = async (dataToken: any, photoToUpdate: any, callback: any) => {

    try {
        const { role, email, id } = dataToken;
        fieldName = photoToUpdate.fieldname

        console.log("req.file", photoToUpdate);

        if (photoToUpdate !== undefined) {
            try {
                resultCloudinary = await cloudinary.uploader.upload(photoToUpdate.path)
                photo_url = resultCloudinary.secure_url

                console.log(photoToUpdate.path);
                console.log(resultCloudinary);
                console.log("photo ", photo_url);
            } catch (error) {
                callback({ "error subiendo imagen": error })
            }
        }
        console.log("fielName", fieldName);

        updateQuery = `UPDATE provider SET ?? = ? WHERE document_provider = ?`;
        updateValues = [fieldName, photo_url, id];

        oldImageUrl = `select ?? from provider WHERE document_provider = ?`

        urlValuesToUpdate = [fieldName, id];

        let publicId: string | null = await deletephotoService.deleteOldImage(oldImageUrl!, urlValuesToUpdate, fieldName)

        connection.query(updateQuery!, updateValues, async (err: QueryError | null, results) => {
            if (err) {
                let urlFailedInsert = resultCloudinary.public_id
                console.log("urlFailedInsert", urlFailedInsert);

                callback({ "Error al actualizar la imagen del provider":err })
                if (urlFailedInsert) {
                    await cloudinary.uploader.destroy(urlFailedInsert);
                }
            } else {
                console.log("exito");
                callback(null, { "imagen actualizada con éxito": photo_url })

                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
                fs.unlink(photoToUpdate.path)
            }
        })

    } catch (error) {
        return callback(error);

    }
}

const updatePhotoGrocer = async (dataToken: any, photoToUpdate: any, callback: any) => {

    try {
        const { role, email, id } = dataToken;
        fieldName = photoToUpdate.fieldname

        console.log("req.file", photoToUpdate);

        if (photoToUpdate !== undefined) {
            try {
                resultCloudinary = await cloudinary.uploader.upload(photoToUpdate.path)
                photo_url = resultCloudinary.secure_url

                console.log(photoToUpdate.path);
                console.log(resultCloudinary);
                console.log("photo ", photo_url);
            } catch (error) {
                callback({ "error subiendo imagen": error })
            }
        }
        console.log("fielName", fieldName);

        updateQuery = `UPDATE grocer SET ?? = ? WHERE document_grocer = ?`;
        updateValues = [fieldName, photo_url, id];

        oldImageUrl = `select ?? from grocer WHERE document_grocer = ?`

        urlValuesToUpdate = [fieldName, id];

        let publicId: string | null = await deletephotoService.deleteOldImage(oldImageUrl!, urlValuesToUpdate, fieldName)

        connection.query(updateQuery!, updateValues, async (err: QueryError | null, results) => {
            if (err) {
                let urlFailedInsert = resultCloudinary.public_id
                console.log("urlFailedInsert", urlFailedInsert);

                callback({ "Error al actualizar imagen del grocer":err })
                if (urlFailedInsert) {
                    await cloudinary.uploader.destroy(urlFailedInsert);
                }
            } else {
                console.log("exito");
                callback(null, { "imagen actualizada con éxito": photo_url })

                console.log("publicId", publicId);
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
                fs.unlink(photoToUpdate.path)
            }
        })

    } catch (error) {
        return callback(error);
    }
}

export default {
    updatePhotoCompany,
    updatePhotoProvider,
    updatePhotoGrocer
}