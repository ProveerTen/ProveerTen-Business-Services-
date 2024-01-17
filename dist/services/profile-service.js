"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db-config"));
const profileService = (query, id, callback) => {
    try {
        db_config_1.default.query(query, [id], (error, results) => {
            if (error) {
                return callback(error);
            }
            let data = results[0][0];
            callback(null, data);
        });
    }
    catch (error) {
        return callback(error);
    }
};
exports.default = {
    profileService
};
