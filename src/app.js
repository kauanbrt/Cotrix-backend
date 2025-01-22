import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Router from './routes/router.js';

dotenv.config({path: './.env'});

const app = express();
const PORT = process.env.PORT || 3000;  
const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", Router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;