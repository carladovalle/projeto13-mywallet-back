import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();

const PORT = process.env.PORTA;

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
    db = mongoClient.db('my_wallet');
});

app.post('/sign-up', async (req,res) => {

    const user = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        checkPassword: joi.string().required(),
    })
    const { error } = userSchema.validate(user);

    if(error) {
        return res.sendStatus(422);
    }

    try {

        const encryptedPassword = bcrypt.hashSync(user.password, 10);

        await db.collection('users').insertOne({ ... user, password: encryptedPassword});
        return res.status(201).send("Usuário criado com sucesso");
   
    } catch (error) {
        return res.status(500).send("Deu ruim");
   
    }
})

app.post('/login', async (req,res) => {

    const user = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
    const { error } = userSchema.validate(user);

    if(error) {
        return res.sendStatus(422);
    }

    try {

        const user1 = await db.collection('users').findOne({ email: user.email });
        if (user && bcrypt.compareSync(user.password,user1.password)) {
            const token = uuid();
            await db.collection('contas').insertOne({
                token,
                user1Id: user1._id
            });
            return res.status(201).send({token});
        } else {
            return res.status(401).send('Senha ou email incorretos!')
        }

    } catch (error) {
        return res.status(500).send("Deu ruim");
   
    }
})

app.listen(PORT, () => {
    console.log(chalk.blue.bold(`Servidor rodando na porta ${PORT}`))
})