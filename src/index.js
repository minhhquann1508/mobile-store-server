import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import connectDb from './configs/db.js';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoute);

const port = process.env.PORT || 5050

try {
  await connectDb();
  app.listen(port, () =>
    console.log(`Server listening on port ${port}!`),
  );
} catch (error) {
  console.log(error);
}


