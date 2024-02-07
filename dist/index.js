"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const dotenv_1 = __importDefault(require("dotenv"));
//import { connectionMysql } from './config/db-mysql';
const db_mongo_1 = require("./config/db-mongo");
// Configuramos dotenv 
dotenv_1.default.config();
// Instanciamos el servidor
const server = new server_1.default();
server.listen();
// Conectamos las bases de datos
//connectionMysql();
(0, db_mongo_1.connectionMongoDb)();
