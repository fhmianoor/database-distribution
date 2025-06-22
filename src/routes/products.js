import express from 'express';
import pgClient from '../db/postgres.js';
import redisClient from '../db/redis.js';
import mongoose from 'mongoose';

const router = express.Router();

const ProductMeta = mongoose.model('ProductMeta', new mongoose.Schema({
  product_id: Number,
  description: String,
  tags: [String],
  specifications: Object
}));

router.get('/', async (req, res) => {
  try {
    const pgResult = await pgClient.query('SELECT * FROM products');
    const products = await Promise.all(pgResult.rows.map(async (p) => {
      const meta = await ProductMeta.findOne({ product_id: p.id });
      const stock = await redisClient.get(`stock:${p.id}`);
      return { ...p, metadata: meta, stock: stock || '0' };
    }));
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;