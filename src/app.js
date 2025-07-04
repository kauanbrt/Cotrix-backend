import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Router from './routes/router.js';

dotenv.config({path: './.env'});

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", Router);


export default app;