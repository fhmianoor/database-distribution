import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();


const pgClient = new Client({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD), 
  database: process.env.PG_DB,
});


export default pgClient;