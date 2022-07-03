import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from "dotenv";
import transactionsRouter from './routes/transactionsRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(transactionsRouter);

const PORT = process.env.PORTA;
app.listen(PORT, () => {
    console.log(chalk.blue.bold(`Servidor rodando na porta ${PORT}`))
})