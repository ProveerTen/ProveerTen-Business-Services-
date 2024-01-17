import express from 'express';
import cors from 'cors';

import profile from './routes/profile';

class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.use(express.json());

        // Cors
        this.app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
    }

    routes() {
        this.app.use('/profile', profile);
    }
}

export default Server;