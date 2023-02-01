import express from 'express';
import { Request, Response, Application } from 'express';
const MongoClient = require('mongodb').MongoClient;
import * as dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as OAuth2Strategy } from 'passport-oauth2'
// import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app: Application = express();
const bp = require('body-parser')

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.cgvcn5o.mongodb.net/${process.env.DB_NAME}`;

passport.use(
  new OAuth2Strategy({
    authorizationURL: "https://accounts.google.com/o/oauth2/auth",
    tokenURL: "https://oauth2.googleapis.com/token",
    clientID: "1094988387871-p6vrb14mtbps3vh1kjsq9b5et1s17odh.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/auth/callback'
  },
  async(accessToken: string, cb: any) => {
    const user = await fetchUserData(accessToken)
    return cb(null, user)
  }
  )
)

const fetchUserData = async (accessToken: string) => {
  const userResponse = await fetch('https://oauth-provider.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return userResponse.json();
};

passport.serializeUser((user: any, cb: any) => {
  cb(null, user);
})

passport.deserializeUser((obj: any, cb: any) => {
  cb(null, obj)
})
app.use(passport.initialize());
app.use(passport.session());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(function(_, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/auth', passport.authenticate('oauth2'))
app.get('/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/login'}),
(_, res: Response) => {
  res.redirect('/')
})

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