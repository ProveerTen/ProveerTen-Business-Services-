import express from 'express';
import cors from 'cors';

import routesEditProfile from './routes/editProfileData';
import routesChangePassword from './routes/changePasswordProfile';
import routesUpdatePhoto from './routes/updatePhotoProfile';

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
        
        this.app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
    }

    routes() {
        this.app.use('/', routesEditProfile);
        this.app.use('/', routesChangePassword);
        this.app.use('/', routesUpdatePhoto);
    }
}

export default Server;