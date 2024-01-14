"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_category = exports.get_names_category = void 0;
const db_config_1 = __importDefault(require("../config/db-config"));
const get_names_category = () => {
    const query = 'call get_names_category';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, (error, result) => {
            if (error) {
                console.log(error);
                return reject('error');
            }
            resolve(result);
        });
    });
};
exports.get_names_category = get_names_category;
const create_category = (name) => {
    const query = 'call insertCategory(?, @message_text)';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(query, name, (error, result) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            resolve(result);
        });
    });
};
exports.create_category = create_category;
