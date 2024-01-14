import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import product from './routes/product';
import category from './routes/category';

class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Cors
        this.app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
    }

    routes() {
        this.app.use('/product', product);
        this.app.use('/category', category);
    }

    folder() {
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }
}

export default Server;