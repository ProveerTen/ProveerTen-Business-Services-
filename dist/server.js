"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./routes/product"));
const category_1 = __importDefault(require("./routes/category"));
const order_1 = __importDefault(require("./routes/order"));
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
        // Body Parser
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        // Cors
        this.app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:4200' }));
    }
    routes() {
        this.app.use('/product', product_1.default);
        this.app.use('/category', category_1.default);
        this.app.use('/order', order_1.default);
    }
    folder() {
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
}
exports.default = Server;
