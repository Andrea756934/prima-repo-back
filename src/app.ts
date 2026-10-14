import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import apiRouter from './api/routes';

import './lib/auth/local/local.strategy';
import './lib/auth/jwt/jwt.strategy';

import { errorHandlers } from './errors';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', apiRouter);
app.use(errorHandlers);


export default app;