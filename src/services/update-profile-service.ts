import connection from '../config/db-mysql';
import Provider from '../models/provider';
import Grocer from '../models/grocer.model';
import Company from '../models/company.model';
import { QueryError } from 'mysql2'


// recoger todos los datos desde el front menos el del doc que deberia de estar deshabilitado y nunca insertarse en la query

const updateDataCompany = (dataToken: any, dataToUpdate: any, callback: any) => {

    let updateQuery: string, updateValues: string[]
    const { role, email, id } = dataToken;

    try {
        // updateQuery = `UPDATE company SET name_company = ?, email_company = ?, national_line_company = ?, foundation_company = ?, description_company = ? WHERE nit_company = ?`;
        updateQuery = 'call update_data_company(?,?,?,?,?,?,@message_text)'

        updateValues = [dataToUpdate.name_company, dataToUpdate.email_company, dataToUpdate.national_line_company, dataToUpdate.foundation_company, dataToUpdate.description_company, id];

        connection.query(updateQuery, updateValues, async (err: QueryError | null, results) => {
            if (err) {
                callback({ "Error al actualizar los datos del usuario company": err })

            } else {
                getCurrentData('call get_data_profile_company(?)', id, (err: QueryError | null, infoProfile: Company) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("exito");
                        callback(null, { "Datos actualizados con éxito": infoProfile })
                    }
                })
            }
        })

    } catch (error) {
        return callback(error);
    }
};

const updateDataProvider = async (dataToken: any, dataToUpdate: any, callback: any) => {

    let updateQuery: string, updateValues: string[]
    const { role, email, id } = dataToken;

    try {
        updateQuery = `UPDATE provider SET name_provider = ?, last_name_provider = ?, email_provider = ? WHERE document_provider = ?`;

        updateValues = [dataToUpdate.name_provider, dataToUpdate.last_name_provider, dataToUpdate.email_provider, id];

        connection.query(updateQuery, updateValues, async (err: QueryError | null, results) => {
            if (err) {
                callback({ "Error al actualizar los datos del usuario provider": err })

            } else {
                getCurrentData('call get_data_profile_provider(?)', id, (err: QueryError | null, infoProfile: Provider) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("exito");
                        callback(null, { "Datos actualizados con éxito": infoProfile })
                    }
                })
            }
        })

    } catch (error) {
        return callback(error);
    }
};

const updateDataGrocer = (dataToken: any, dataToUpdate: any, callback: any) => {

    let updateQuery: string, updateValues: string[]
    const { role, email, id } = dataToken;

    try {
        updateQuery = "call update_data_grocer(?,?,?,?,?,?,?,?,?,?,?,@message_text)"

        updateValues = [dataToUpdate.name_grocer, dataToUpdate.last_name_grocer, dataToUpdate.email_grocer, dataToUpdate.name_store, dataToUpdate.city_grocer, dataToUpdate.neighborhood, dataToUpdate.street, dataToUpdate.number_street, dataToUpdate.apartment, dataToUpdate.number_grocer, id];

        connection.query(updateQuery, updateValues, async (err: QueryError | null, results) => {
            if (err) {
                callback({ "Error al actualizar los datos del usuario grocer": err })

            } else {
                getCurrentData('call get_data_profile_grocer(?)', id, (err: QueryError | null, infoProfile: Grocer) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("exito");
                        callback(null, { "Datos actualizados con éxito": infoProfile })
                    }
                })
            }
        })

    } catch (error) {
        return callback(error);
    }
};

const getCurrentData = (procAlm: string, id: any, callback: any) => {

    const queryCurrentData: string = procAlm;

    connection.query(queryCurrentData, [id], (error: QueryError | null, results: any[]) => {
        console.log(results);

        if (error) {
            return callback(error);
        }
        if (results.length > 0) {
            let infoProfile: Provider | Grocer | Company = results[0]
            callback(null, infoProfile) //interface
        } else {
            return callback({ err: "usuario no encontrado" });
        }
    });
};

export default {
    updateDataCompany,
    updateDataProvider,
    updateDataGrocer,
    getCurrentData
}