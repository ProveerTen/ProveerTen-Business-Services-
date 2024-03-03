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
            updateQuery = "call update_data_provider(?,?,?,?,?,?,?,?,?, @message_text)";
            updateValues = [dataToUpdate.name_provider, dataToUpdate.last_name_provider, dataToUpdate.email_provider, dataToUpdate.city_provider, dataToUpdate.neighborhood, dataToUpdate.street, dataToUpdate.number_street, dataToUpdate.number_provider, id];
            connection.query(updateQuery, updateValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log("apartment", dataToUpdate.apartment);
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
const addSocialRed = (dataToAdd, callback) => {
    let addQuery, addValues;
    try {
        addQuery = "insert into socialRed (link, icon, fk_nit_company_socialRed) values (?,?,?)";
        addValues = [dataToAdd.link, dataToAdd.icon, dataToAdd.nit_company];
        console.log(addValues);
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            connection.query(addQuery, addValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                connection.release();
                if (err) {
                    callback({ "Error insertando los datos": err });
                }
                else {
                    console.log("exito");
                    callback(null, { "Datos insertados con exito": results });
                }
            }));
        });
    }
    catch (error) {
        return callback(error);
    }
};
const getSocialRed = (id, callback) => {
    let getQuery, getValues;
    console.log("id___", id);
    try {
        getQuery = "select * from socialRed where fk_nit_company_socialRed = ?";
        getValues = [id];
        console.log(getValues);
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            connection.query(getQuery, getValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                connection.release();
                if (err) {
                    console.log("error", err);
                    callback({ "Error obteniendo los datos": err });
                }
                else {
                    console.log("exito");
                    console.log(results);
                    callback(null, { data: results });
                }
            }));
        });
    }
    catch (error) {
        return callback(error);
    }
};
const deleteSocialRed = (id, datatoDelete, callback) => {
    let getQuery, getValues;
    try {
        getQuery = "delete from socialRed where id = ?";
        getValues = [datatoDelete.id];
        console.log(getValues);
        db_mysql_1.default.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            connection.query(getQuery, getValues, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
                connection.release();
                if (err) {
                    callback({ "Error eliminando los datos": err });
                }
                else {
                    console.log("exito");
                    callback(null, { data: results });
                }
            }));
        });
    }
    catch (error) {
        return callback(error);
    }
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
    getCurrentData,
    addSocialRed,
    getSocialRed,
    deleteSocialRed
};
