import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

<<<<<<< Updated upstream
import indexRouter from './routes';
import usersRouter from './routes/users';
=======
import indexRouter from "./router/index";
import usersRouter from "./router/users";
>>>>>>> Stashed changes

const app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})

// export default app;
