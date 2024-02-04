"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export const connectionMysql = () => {
    connection.connect((error) => {
        if (error) {
            console.error(`Error connecting to the database "${process.env.DATABASE}"`, error);
        } else {
            console.log(`Connection established with the database "${process.env.DATABASE}"`);
        }
    });
}

export default connection;
*/
const pool = mysql2_1.default.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
pool.getConnection((error, connection) => {
    if (error) {
        console.error(`Error connecting to the database "${process.env.DATABASE}"`, error);
        return;
    }
    console.log(`Connection established with the database "${process.env.DATABASE}"`);
    connection.release(); // Libera la conexión de prueba
});
exports.default = pool;
