import express from 'express';
import { Request, Response, Application } from 'express';
// import { requiresAuth } from 'express-openid-connect';

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
// const { auth } = require('express-openid-connect');

// import { v4 as uuidv4 } from 'uuid';

const app: Application = express();
const bp = require('body-parser')
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.cgvcn5o.mongodb.net/${process.env.DB_NAME}`;
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASEURL,
//   clientID: process.env.CLIENTID,
//   issuerBaseURL: process.env.ISSUER
// };

// app.use(auth(config));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(function(_, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

// app.get('/', (req: any, res: any) => {

//   if (req.oidc.isAuthenticated()) {
//     res.redirect("http://localhost:3000")
//   } else {
//     res.redirect("http://localhost:8080/login")
//   }
// });


// app.get('/profile', (req: any, res) => {
//   res.send(JSON.stringify(req.oidc.user))
// })


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