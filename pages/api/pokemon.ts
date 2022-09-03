import { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'asdasd';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

export default async (req: Request, res: Response<IPk[]>) => {
  const db = await connectToDatabase();
  const collection = db.collection('saved');
  const poke = await collection.find().toArray();
  const final = poke.map((entity) => ({ name: entity.name }));
  res.json(final);
};
