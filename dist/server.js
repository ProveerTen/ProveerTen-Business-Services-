"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const publication_1 = __importDefault(require("./routes/publication"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.folder();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:4200' }));
        this.app.use((0, morgan_1.default)('dev'));
    }
    routes() {
        this.app.use('/publication', publication_1.default);
    }
    folder() {
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
}
exports.default = Server;
