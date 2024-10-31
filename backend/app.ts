import express from 'express';
import path from 'path';
import {getRepository} from "./repository/repository";
import {getFileRoutes} from "./routes/file";
import {App} from "./type/app";
import {connect, connectPool} from "./database/connect";

var server = express();
import indexRouter from './routes';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join('public')));
server.use(express.static(path.join(__dirname, 'public')));

const database = connectPool()
server.use(express.json());

server.use('/', indexRouter);
server.use('/users', usersRouter);
server.use('/auth', authRouter);

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