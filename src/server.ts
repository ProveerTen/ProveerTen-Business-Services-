import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import provider from './routes/delete-provider'
import publication from './routes/publication';
import providerU from './routes/provider';
import profile from './routes/profile';
import routesEditProfile from './routes/editProfileData';
import routesChangePassword from './routes/changePasswordProfile';
import routesUpdatePhoto from './routes/updatePhotoProfile';
import product from './routes/product';
import category from './routes/category';
import order from './routes/order'
import view from './routes/view'

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
        this.app.use(cors({ credentials: true, origin: '*' }));
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/publication', publication);
        this.app.use('/profile', profile);
        this.app.use('/provider', provider);
        this.app.use('/provideru', providerU);
        this.app.use('/edit_profile', routesEditProfile);
        this.app.use('/password', routesChangePassword);
        this.app.use('/photo', routesUpdatePhoto);
        this.app.use('/product', product);
        this.app.use('/category', category);
        this.app.use('/order', order);
        this.app.use('/view', view);
    }

    folder() {
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }
}

export default Server;
