import pgClient from '../db/postgres.js';
import mongoose from 'mongoose';
import redisClient from '../db/redis.js';
import mongoConnect from '../db/mongo.js';
import dotenv from 'dotenv';
dotenv.config();

const ProductMeta = mongoose.model('ProductMeta', new mongoose.Schema({
  product_id: Number,
  description: String,
  tags: [String],
  specifications: Object
}));

async function seed() {
  await pgClient.connect();
  await mongoConnect();
  await redisClient.connect();

  await pgClient.query(`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price NUMERIC
  )`);

  await pgClient.query(`INSERT INTO products (name, price) VALUES
    ('Laptop A', 1200),
    ('Phone B', 800),
    ('Tablet C', 500)
  ON CONFLICT DO NOTHING`);

  await ProductMeta.deleteMany({});
  await ProductMeta.insertMany([
    {
      product_id: 1,
      description: 'High-performance laptop',
      tags: ['electronics', 'laptop'],
      specifications: { ram: '16GB', cpu: 'Intel i7' }
    },
    {
      product_id: 2,
      description: 'Smartphone with AMOLED display',
      tags: ['electronics', 'phone'],
      specifications: { storage: '128GB', camera: '12MP' }
    },
    {
      product_id: 3,
      description: 'Affordable tablet',
      tags: ['electronics', 'tablet'],
      specifications: { screen: '10 inch', battery: '6000mAh' }
    }
  ]);

  await redisClient.set('stock:1', '15');
  await redisClient.set('stock:2', '8');
  await redisClient.set('stock:3', '22');

  console.log('Seeding done');
  process.exit();
}

seed();
