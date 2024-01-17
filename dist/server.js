"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const profile_1 = __importDefault(require("./routes/profile"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    middlewares() {
        // Body Parser
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:4200' }));
    }
    routes() {
        this.app.use('/profile', profile_1.default);
    }
}
exports.default = Server;
