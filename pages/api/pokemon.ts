import { MongoClient, Db } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = process.env.MONGODB_URI || 'asdasd';

let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const cliente = new MongoClient(uri);
  const client = await cliente.connect();
  const db = client.db('pokemon');
  cachedDb = db;
  return db;
}

interface IPk {
  name:string
}

export const joana = async () => {
  const db = await connectToDatabase();
  const collection = db.collection('saved');
  const poke = await collection.find().toArray();
  // const date = new Date();
  const final = poke.map((entity) => ({
    name: entity.name,
    timestamp: entity.timestamp,
  }));
  return final;
};

const rodrigo = async () => {
  const db = await connectToDatabase();
  const collection = db.collection('saved');
  return collection;
};

const claudia = async (req: NextApiRequest, res: NextApiResponse<IPk[]>) => {
  const collection = await rodrigo();
  const poke = await collection.find().toArray();
  // const date = new Date();
  // await collection.insertOne({name: 'Celia2', timestamp: date });
  const final = poke.map((entity) => ({
    name: entity.name,
    timestamp: entity.timestamp,
  }));
  res.json(final);
};

export default claudia;
