import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

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

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

pool.getConnection((error, connection) => {
    if (error) {
        console.error(`Error connecting to the database "${process.env.DATABASE}"`, error);
        console.log(error)
        return;
    }
    console.log(`Connection established with the database "${process.env.DATABASE}"`);
    connection.release(); // Libera la conexión de prueba
});

export default pool;
