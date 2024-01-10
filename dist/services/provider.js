"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerDelete = exports.verifyProvider = void 0;
const db_mysql_1 = __importDefault(require("../config/db-mysql"));
const verifyProvider = (document, callback) => {
    const providerSql = "call VerifyProvider(?,@message_text);";
    try {
        db_mysql_1.default.query(providerSql, document, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
    catch (error) {
        return callback(error);
    }
};
exports.verifyProvider = verifyProvider;
const providerDelete = (document_provider, callback) => {
    const deleteQuery = "call delete_provider (?,@message_text);";
    try {
        db_mysql_1.default.query(deleteQuery, document_provider, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    }
    catch (error) {
        return callback(error);
    }
};
exports.providerDelete = providerDelete;
