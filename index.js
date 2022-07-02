import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from "dotenv";

import { loginUser, createUser } from './controllers/userController.js';
import { lookInput, createInput, lookOutput, createOutput } from './controllers/transactionsController.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', createUser);
app.post('/login', loginUser);

app.get('/input', lookInput);
app.post('/input', createInput);
app.get('/output', lookOutput);
app.post('/output', createOutput);

const PORT = process.env.PORTA;
app.listen(PORT, () => {
    console.log(chalk.blue.bold(`Servidor rodando na porta ${PORT}`))
})