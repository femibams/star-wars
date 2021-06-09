import * as express from "express";
import * as bodyParser from "body-parser";
import 'reflect-metadata';
import * as routes from './routes';
import config from './config';
import cors, { CorsOptions } from 'cors';
import {createConnection} from "typeorm";

const app = express();
const PORT = config.port || 8080;

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    // app.use(cors(corsOptions))

    // register all application routes
    
    routes.BaseRoutes.setup(app)
    routes.AuthRoutes.setup(app)
    routes.CommentRoutes.setup(app)
    routes.MovieRoutes.setup(app)

    // run app
    app.listen(PORT);

    console.log(`Express application is up and running on port ${PORT}`);

}).catch(error => console.log("TypeORM connection error: ", error));
