import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import connectDb from './configs/db.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import brandRoute from './routes/brandRoute.js';
import productRoute from './routes/productRoute.js';
import subProductRoute from './routes/subProductRoute.js';
import commentRoute from './routes/commentRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/brands', brandRoute);
app.use('/api/products', productRoute);
app.use('/api/sub-products', subProductRoute);
app.use('/api/comments', commentRoute);

const port = process.env.PORT || 5050

try {
  await connectDb();
  app.listen(port, () =>
    console.log(`Server listening on port ${port}!`),
  );
} catch (error) {
  console.log(error);
}


