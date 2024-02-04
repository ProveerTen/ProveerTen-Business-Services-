import Server from './server';
import dotenv from 'dotenv'
//import { connectionMysql } from './config/db-mysql';
import { connectionMongoDb } from './config/db-mongo';

// Configuramos dotenv 
dotenv.config();

// Instanciamos el servidor
const server = new Server();

server.listen();

// Conectamos las bases de datos
//connectionMysql();
connectionMongoDb();