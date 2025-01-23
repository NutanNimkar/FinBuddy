import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import stocksRoutes from './routes/stocks.ts';
import chatRoutes from './routes/chat.ts';

dotenv.config();
const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
app.use('/api/stocks', stocksRoutes);
app.use('/api/chat', chatRoutes);


app.listen(3001, () => console.log('Server running on port 3001'));