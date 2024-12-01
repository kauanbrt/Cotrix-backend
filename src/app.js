import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import userRouter from './routes/userRouter.js';

dotenv.config({path: './.env'});

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cors(corsOptions));

// app.use(userRouter);

export default app;