"use strict";
//import connection from "../config/db-mysql";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerDelete = exports.verifyProvider = void 0;
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


export const providerDelete = (document_provider: any, callback: any) => {

    
  const deleteQuery = "call delete_provider (?,@message_text);";

  try {
    connection.query(
      deleteQuery,
      document_provider,
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
const providerDelete = (document_provider, callback) => {
    const deleteQuery = "call delete_provider (?,@message_text);";
    db_mysql_1.default.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        try {
            connection.query(deleteQuery, document_provider, (error, results) => {
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
exports.providerDelete = providerDelete;
