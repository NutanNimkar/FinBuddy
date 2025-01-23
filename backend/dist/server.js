import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
app.get('/api/stocks', async (req, res) => {
    const stocks = await pool.query('SELECT * FROM stocks');
    res.json(stocks.rows);
});
// app.post('/api/chat', async (req, res) => {
//     const { query } = req.body;
//     const response = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: query }],
//     });
//     res.json(response.data.choices[0].message.content);
// });
app.listen(3001, () => console.log('Server running on port 3001'));
