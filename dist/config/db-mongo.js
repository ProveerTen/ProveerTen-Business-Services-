"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionMongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectionMongoDb() {
    mongoose_1.default.connect(process.env.DB_CONNECTION)
        .then(connection => {
        console.log(`connection established in database "${connection.connections[0].name}"`);
    })
        .catch(error => {
        console.log(error);
    });
}
exports.connectionMongoDb = connectionMongoDb;
