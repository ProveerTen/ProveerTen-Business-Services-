import connection from "../config/db-mysql";
import Provider from "../models/provider";


export const verifyProvider = (document: any, callback: any) => {
  const providerSql = "call VerifyProvider(?,@message_text);";

  try {
    connection.query(providerSql, document, (error: any, results: any) => {
      if (error) {
        return callback(error);
      }
      

      callback(null, results);
    });
  } catch (error) {
    return callback(error);
  }
};


export const providerUpdate = (data: Provider, callback: any) => {
    
  const updateQuery = "call update_data_provider (?,?,?,?,?,?,?,?,?,?,?,@message_text);";

  try {
    connection.query(
      updateQuery,
      [
        data.document_provider,
        data.name_provider,
        data.last_name_provider,
        data.email_provider,
        data.password_provider,
        data.profile_photo_provider,
        data.nit_company,
        data.city_provider,
        data.neighborhood,
        data.street,
        data.number_street,
        data.number_provider,
      ],
      (error: any, results: any) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  } catch (error) {
    return callback(error);
  }
};
