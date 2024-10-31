import express from 'express';
import path from 'path';
import {getRepository} from "./repository/repository";
import {getFileRoutes} from "./routes/file";
import {App} from "./type/app";
import {connect} from "./database/connect";

var server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join('public')));

const database = connect()

const PORT = process.env.PORT || 4040;

// export default app;
const repository = getRepository(database)

const app: App = {
    repository
}

const fileRoutes = getFileRoutes(app)

server.use(fileRoutes)

server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})