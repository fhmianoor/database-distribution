import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

import pgClient from './db/postgres.js';
import mongoConnect from './db/mongo.js';
import redisClient from './db/redis.jskal/\\Z';

import productRoutes from './routes/products.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

async function startServer() {
  try {
    await pgClient.connect();
    await mongoConnect();
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

startServer();