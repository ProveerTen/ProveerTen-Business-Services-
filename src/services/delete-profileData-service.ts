import { QueryError } from 'mysql2'

import connection from '../config/db-mysql';
import Provider from '../models/provider';
import Grocer from '../models/grocer.model';
import Company from '../models/company.model';
import cloudinary from '../libs/cloudinary';

import currentDataService from '../services/update-profile-service'

const deleteDataProfile = async (dataToken: any, dataToDelete: any, callback: any) => {

    try {
        let deleteDataQuery: string, deleteValues: string[];
        let imageUrlToDelete: string, nameFielPK: string, publicId: string | null

        const { role, email, id } = dataToken;

        let fieldName = dataToDelete.deleteField
        console.log("field name a delete", fieldName);

        const validFields: string[] = ['profile_photo_grocer', 'cover_photo_grocer', 'apartment', 'profile_photo_provider', 'profile_photo_company', 'cover_photo_company', 'foundation_company', 'description_company'];

        if (!validFields.includes(fieldName)) {
            return callback("Campo no válido para borrar o incorrecto")
        }

        // Mapeo de campos a tablas
        const fieldToTable: Record<string, string> = {
            profile_photo_grocer: 'grocer',
            cover_photo_grocer: 'grocer',
            apartment: 'locationGrocer',
            profile_photo_provider: 'provider',
            profile_photo_company: 'company',
            cover_photo_company: 'company',
            foundation_company: 'company',
            description_company: 'company'
        };

        let tableName = fieldToTable[fieldName];

        if (!tableName) {
            return callback("No se pudo determinar la tabla asociada al campo proporcionado");
        }

        const fieldPKToTable: Record<string, string> = { //pk de las tablas
            grocer: 'document_grocer',
            locationGrocer: 'fk_document_locationGrocer',
            provider: 'document_provider',
            company: 'nit_company'
        };

        let namePK = fieldPKToTable[tableName];

        if (!namePK) {
            return callback("No se pudo determinar la PK de la tabla a la que pertenece este campo");
        }

        deleteDataQuery = `UPDATE ${tableName} SET ?? = null WHERE ${namePK} = ?`;
        deleteValues = [fieldName, id];

        const imagesFields: string[] = ['profile_photo_grocer', 'cover_photo_grocer', 'profile_photo_provider', 'profile_photo_company', 'cover_photo_company']

        if (imagesFields.includes(fieldName)) {
            imageUrlToDelete = `select ?? from ${role} WHERE ${namePK} = ?`
            console.log(role, id);

            publicId = await deleteOldImage(imageUrlToDelete!, deleteValues, fieldName)
            console.log("Publicid", publicId);
        }
        console.log(deleteDataQuery, deleteValues, imageUrlToDelete!);

        connection.query(deleteDataQuery!, deleteValues, async (err, results) => {
            if (err) {
                callback({ "Error al eliminar datos de la company": err })

            } else {
                currentDataService.getCurrentData(procAlm(role), id, (err: QueryError | null, infoProfile: Company | Provider | Grocer) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("exito");
                        callback(null, { "Dato eliminado con éxito": infoProfile })
                    }
                })
                console.log("PUBLIC ID", publicId);

                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
            }
        })

    } catch (error) {
        return callback(error);
    }
}

const procAlm = (role: string): string => {
    let procAlmRol: string;

    if (role === 'company') {
        procAlmRol = 'call get_data_profile_company(?)'
    }
    if (role === 'provider') {
        procAlmRol = 'call get_data_profile_provider(?)'
    }
    if (role === 'grocer') {
        procAlmRol = 'call get_data_profile_grocer(?)'
    }
    console.log("credentials", role);
    return procAlmRol!;
}

const deleteOldImage = (urlImage: string, urlVaues: any, fieldName: string): Promise<any> => {

    return new Promise((resolve, reject) => {
        connection.query(urlImage, urlVaues, (err, result: any[]) => {

            if (err) {
                reject({ "Error al consultar en la bd:": err });

            } else {
                console.log("RESULT", result);

                let urlImagen: string | null = result[0][fieldName]
                console.log("urlImagen", urlImagen);

                if (urlImagen != null) {
                    let split = urlImagen.split(/[./]/)
                    console.log("Split", split);
                    resolve(split[9]);
                } else {
                    resolve(null);
                }
            }
        })

    })
}

export default {
    deleteDataProfile,
    deleteOldImage
}

// if (role === 'company') {
//     nameFielPK = 'nit_company'
// } else if (role === 'provider') {
//     nameFielPK = 'document_provider'
// } else if (role === 'grocer') {
//     nameFielPK = 'document_grocer'
// }

// FRONT ELIMINAR
// 	<!-- Estructura HTML de tu página -->
// <div id="perfil">
//   <p id="nombre">Nombre: Juan</p>
//   <button onclick="eliminarCampo('nombre')">Eliminar Nombre</button>

//   <p id="edad">Edad: 25</p>
//   <button onclick="eliminarCampo('edad')">Eliminar Edad</button>

//   <!-- Otros campos y botones de eliminar -->
// </div>

// <script>
//   function eliminarCampo(nombreCampo) {
//     // Realizar la solicitud al backend para eliminar el campo
//     fetch(`/perfil/${ID_DEL_PERFIL}/eliminar-campo`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ campoEliminar: nombreCampo }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data); // Manejar la respuesta del servidor si es necesario
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }
// </script>