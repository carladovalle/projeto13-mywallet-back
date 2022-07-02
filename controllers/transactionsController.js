import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from '../dbStrategy/mongo.js';

export async function lookInput (req,res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const session = await db.collection('contas').findOne({ token });

    if (!session) {
        return res.sendStatus(401);
    }
    
    try {
    
        const contas = await db.collection('contas').find({ user1Id: new ObjectId(session.user1Id) }).toArray();
    
        res.send(contas);
        res.send(authorization);

    } catch (error) {
        
        return res.status(500).send("Deu ruim");
   
    }

}

export async function createInput (req,res) {

    const conta = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const contaSchema = joi.object({
        valor: joi.number().required(),
        descricao: joi.string().required()
    })

    const { error } = contaSchema.validate(conta);

    if (error) {
        return res.sendStatus(422);
    }

    try {
        const session = await db.collection('contas').findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }
    
        await db.collection('contas').insertOne({ ... conta, user1Id: session.user1Id });
        return res.status(201).send('Valor adicionado com sucesso');

    } catch (error) {
        
        return res.status(500).send("Deu ruim");
   
    }

}

export async function lookOutput (req,res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const session = await db.collection('contas').findOne({ token });

    if (!session) {
        return res.sendStatus(401);
    }
    
    try {
    
        const contas = await db.collection('contas').find({ user1Id: new ObjectId(session.user1Id) }).toArray();
    
        res.send(contas);
        res.send(authorization);

    } catch (error) {
        
        return res.status(500).send("Deu ruim");
   
    }

}

export async function createOutput (req,res) {

    const conta = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const contaSchema = joi.object({
        valor: joi.number().required(),
        descricao: joi.string().required()
    })

    const { error } = contaSchema.validate(conta);

    if (error) {
        return res.sendStatus(422);
    }

    try {

        const session = await db.collection('contas').findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }
    
        await db.collection('contas').insertOne({ ... conta, user1Id: session.user1Id });
        return res.status(201).send('Valor adicionado com sucesso');

    } catch (error) {
        
        return res.status(500).send("Deu ruim");
   
    }

}