import express from 'express';
import { Request, Response, Application } from 'express';
const MongoClient = require('mongodb').MongoClient;
import * as dotenv from 'dotenv'
// import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app: Application = express();
const bp = require('body-parser')

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.cgvcn5o.mongodb.net/${process.env.DB_NAME}`;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(function(_, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

MongoClient.connect(uri, { useUnifiedTopology: true }, (err: string, client: any) => {
  if (err) {
    console.error(err);
    return;
  }
  const collection = client.db('twitter-like').collection('database')
  const db = client.db(process.env.DB_NAME);
  app.get('/api', (_, res) => {
        const stream = db.collection('database').find({}).stream();
        stream.on('data', (item: any) => {
          console.log(item)
          res.send(item);
        });
        stream.on('close', () => {
          res.end();
        });
        stream.on('error', (error: string) => {
          console.error(error);
          res.status(500).send({ error: 'Error fetching data' });
        });
      });
  app.post('/api/tweet', async (req: Request, res: Response) => {
    const post = req.body
    try {
      const result = await collection.insertOne({post})
      res.status(200).send(result)
    } catch (err) {
      res.status(404).send(err)
    }
  })
});

export default app