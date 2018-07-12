import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import {toDoRouter} from './routes/to-do-router';
import {router} from './routes/router';

export const app = express();


app.use(cookieParser(),express.urlencoded({ extended: true }));
app.use('/api/todo', toDoRouter);
app.use('/', router);

