"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerUpdate = exports.verifyProvider = void 0;
/*
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
*/
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const verifyProvider = (document, callback) => {
    const providerSql = "call VerifyProvider(?,@message_text);";
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            connection.query(providerSql, document, (error, results) => {
                connection.release();
                if (error) {
                    return callback(error);
                }
                callback(null, results);
            });
        }
        catch (error) {
            return callback(error);
        }
    });
};
exports.verifyProvider = verifyProvider;
const providerUpdate = (data, callback) => {
    const updateQuery = "call update_data_provider (?,?,?,?,?,?,?,?,?,?,?,@message_text);";
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            connection.query(updateQuery, [
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
            ], (error, results) => {
                connection.release();
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        }
        catch (error) {
            return callback(error);
        }
    });
};
exports.providerUpdate = providerUpdate;
