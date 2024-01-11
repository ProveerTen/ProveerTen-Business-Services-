import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import provider from './routes/delete-provider'

import publication from './routes/publication';
import providerU from './routes/provider';


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
        this.app.use(express.json());
        this.app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/publication', publication);

        this.app.use ('/provider', provider)
        this.app.use('/provideru', providerU)
    }

    folder() {
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }
}

export default Server;
