"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const provider_1 = __importDefault(require("./routes/provider"));
const publication_1 = __importDefault(require("./routes/publication"));
const profile_1 = __importDefault(require("./routes/profile"));
const editProfileData_1 = __importDefault(require("./routes/editProfileData"));
const changePasswordProfile_1 = __importDefault(require("./routes/changePasswordProfile"));
const updatePhotoProfile_1 = __importDefault(require("./routes/updatePhotoProfile"));
const product_1 = __importDefault(require("./routes/product"));
const category_1 = __importDefault(require("./routes/category"));
const order_1 = __importDefault(require("./routes/order"));
const view_1 = __importDefault(require("./routes/view"));
const search_1 = __importDefault(require("./routes/search"));
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
        const allowedOrigins = ['https://proveerten.netlify.app', 'https://proveer-ten-front-end-git-hu-featurechat-bryctans-projects.vercel.app', 'http://localhost:4200'];
        this.app.use((0, cors_1.default)({ credentials: true, origin: allowedOrigins }));
        this.app.use((0, morgan_1.default)('dev'));
    }
    routes() {
        this.app.use('/publication', publication_1.default);
        this.app.use('/profile', profile_1.default);
        this.app.use('/provider', provider_1.default);
        this.app.use('/edit_profile', editProfileData_1.default);
        this.app.use('/password', changePasswordProfile_1.default);
        this.app.use('/photo', updatePhotoProfile_1.default);
        this.app.use('/product', product_1.default);
        this.app.use('/category', category_1.default);
        this.app.use('/order', order_1.default);
        this.app.use('/view', view_1.default);
        this.app.use('/search', search_1.default);
    }
    folder() {
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
}
exports.default = Server;
