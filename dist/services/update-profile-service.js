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
// recoger todos los datos desde el front menos el del doc que deberia de estar deshabilitado y nunca insertarse en la query
const updateDataCompany = (dataToken, dataToUpdate, callback) => {
    let updateQuery, updateValues;
    const { role, email, id } = dataToken;
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            updateQuery = 'call update_data_company(?,?,?,?,?,?,@message_text)';
            updateValues = [dataToUpdate.name_company, dataToUpdate.email_company, dataToUpdate.national_line_company, dataToUpdate.foundation_company, dataToUpdate.description_company, id];
            connection.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                connection.release();
                if (err) {
                    callback({ "Error al actualizar los datos del usuario company": err });
                }
                else {
                    getCurrentData('call get_data_profile_company(?)', id, (err, infoProfile) => {
                        if (err) {
                            callback(err);
                        }
                        else {
                            console.log("exito");
                            callback(null, { "Datos actualizados con éxito": infoProfile });
                        }
                    });
                }
            }));
        }
        catch (error) {
            return callback(error);
        }
    });
};
const updateDataProvider = (dataToken, dataToUpdate, callback) => __awaiter(void 0, void 0, void 0, function* () {
    let updateQuery, updateValues;
    const { role, email, id } = dataToken;
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            updateQuery = `UPDATE provider SET name_provider = ?, last_name_provider = ?, email_provider = ? WHERE document_provider = ?`;
            updateValues = [dataToUpdate.name_provider, dataToUpdate.last_name_provider, dataToUpdate.email_provider, id];
            connection.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                connection.release();
                if (err) {
                    callback({ "Error al actualizar los datos del usuario provider": err });
                }
                else {
                    getCurrentData('call get_data_profile_provider(?)', id, (err, infoProfile) => {
                        if (err) {
                            callback(err);
                        }
                        else {
                            console.log("exito");
                            callback(null, { "Datos actualizados con éxito": infoProfile });
                        }
                    });
                }
            }));
        }
        catch (error) {
            return callback(error);
        }
    });
});
const updateDataGrocer = (dataToken, dataToUpdate, callback) => {
    let updateQuery, updateValues;
    const { role, email, id } = dataToken;
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            updateQuery = "call update_data_grocer(?,?,?,?,?,?,?,?,?,?,?,@message_text)";
            updateValues = [dataToUpdate.name_grocer, dataToUpdate.last_name_grocer, dataToUpdate.email_grocer, dataToUpdate.name_store, dataToUpdate.city_grocer, dataToUpdate.neighborhood, dataToUpdate.street, dataToUpdate.number_street, dataToUpdate.apartment, dataToUpdate.number_grocer, id];
            connection.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                connection.release();
                if (err) {
                    callback({ "Error al actualizar los datos del usuario grocer": err });
                }
                else {
                    getCurrentData('call get_data_profile_grocer(?)', id, (err, infoProfile) => {
                        if (err) {
                            callback(err);
                        }
                        else {
                            console.log("exito");
                            callback(null, { "Datos actualizados con éxito": infoProfile });
                        }
                    });
                }
            }));
        }
        catch (error) {
            return callback(error);
        }
    });
};
const getCurrentData = (procAlm, id, callback) => {
    const queryCurrentData = procAlm;
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        connection.query(queryCurrentData, [id], (error, results) => {
            connection.release();
            console.log(results);
            if (error) {
                return callback(error);
            }
            if (results.length > 0) {
                let infoProfile = results[0];
                callback(null, infoProfile); //interface
            }
            else {
                return callback({ err: "usuario no encontrado" });
            }
        });
    });
};
exports.default = {
    updateDataCompany,
    updateDataProvider,
    updateDataGrocer,
    getCurrentData
};
