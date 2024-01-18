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
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
const update_profile_service_1 = __importDefault(require("../services/update-profile-service"));
const deleteDataProfile = (dataToken, dataToDelete, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deleteDataQuery, deleteValues;
        let imageUrlToDelete, nameFielPK, publicId;
        const { role, email, id } = dataToken;
        let fieldName = dataToDelete.deleteField;
        console.log("field name a delete", fieldName);
        const validFields = ['profile_photo_grocer', 'cover_photo_grocer', 'apartment', 'profile_photo_provider', 'profile_photo_company', 'cover_photo_company', 'foundation_company', 'description_company'];
        if (!validFields.includes(fieldName)) {
            return callback("Campo no válido para borrar o incorrecto");
        }
        // Mapeo de campos a tablas
        const fieldToTable = {
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
        const fieldPKToTable = {
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
        const imagesFields = ['profile_photo_grocer', 'cover_photo_grocer', 'profile_photo_provider', 'profile_photo_company', 'cover_photo_company'];
        if (imagesFields.includes(fieldName)) {
            imageUrlToDelete = `select ?? from ${role} WHERE ${namePK} = ?`;
            console.log(role, id);
            publicId = yield deleteOldImage(imageUrlToDelete, deleteValues, fieldName);
            console.log("Publicid", publicId);
        }
        console.log(deleteDataQuery, deleteValues, imageUrlToDelete);
        db_mysql_1.default.query(deleteDataQuery, deleteValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                callback({ "Error al eliminar datos de la company": err });
            }
            else {
                update_profile_service_1.default.getCurrentData(procAlm(role), id, (err, infoProfile) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        console.log("exito");
                        callback(null, { "Dato eliminado con éxito": infoProfile });
                    }
                });
                console.log("PUBLIC ID", publicId);
                if (publicId) {
                    yield cloudinary_1.default.uploader.destroy(publicId);
                }
            }
        }));
    }
    catch (error) {
        return callback(error);
    }
});
const procAlm = (role) => {
    let procAlmRol;
    if (role === 'company') {
        procAlmRol = 'call get_data_profile_company(?)';
    }
    if (role === 'provider') {
        procAlmRol = 'call get_data_profile_provider(?)';
    }
    if (role === 'grocer') {
        procAlmRol = 'call get_data_profile_grocer(?)';
    }
    console.log("credentials", role);
    return procAlmRol;
};
const deleteOldImage = (urlImage, urlVaues, fieldName) => {
    return new Promise((resolve, reject) => {
        db_mysql_1.default.query(urlImage, urlVaues, (err, result) => {
            if (err) {
                reject({ "Error al consultar en la bd:": err });
            }
            else {
                console.log("RESULT", result);
                let urlImagen = result[0][fieldName];
                console.log("urlImagen", urlImagen);
                if (urlImagen != null) {
                    let split = urlImagen.split(/[./]/);
                    console.log("Split", split);
                    resolve(split[9]);
                }
                else {
                    resolve(null);
                }
            }
        });
    });
};
exports.default = {
    deleteDataProfile,
    deleteOldImage
};
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
