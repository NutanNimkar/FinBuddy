import { Response, Request } from "express";
import { pool } from "../server.ts";

async function getStocks(req: Request, res: Response) {
  try {
    const stocks = await pool.query("SELECT * FROM stocks");
    res.json(stocks.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}
async function getStock(req: Request, res: Response) {
  try {
    const { ticker } = req.params;
    const stock = await pool.query("SELECT * FROM stocks WHERE ticker = $1", [ticker]);
    res.json(stock.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
}

async function addStock(req: Request, res: Response){
    try{
        const { ticker, name, market_cap, price } = req.body;
        const newStock = await pool.query("INSERT INTO stocks (ticker, name, market_cap, price) VALUES ($1, $2, $3, $4) RETURNING *", [ticker, name, market_cap, price]);
        res.json(newStock.rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

async function updateStock(req: Request, res: Response) {
    try {
        const { ticker } = req.params;
        const { name, market_cap, price } = req.body;

        // Collect the fields to update dynamically
        const fields = [];
        const values = [];
        let index = 1;

        if (name !== undefined) {
            fields.push(`name = $${index++}`);
            values.push(name);
        }
        if (market_cap !== undefined) {
            fields.push(`market_cap = $${index++}`);
            values.push(market_cap);
        }
        if (price !== undefined) {
            fields.push(`price = $${index++}`);
            values.push(price);
        }

        if (fields.length === 0) {
            return res.status(400).json({ error: "No fields provided to update" });
        }

        values.push(ticker);

        const query = `
            UPDATE stocks
            SET ${fields.join(', ')}
            WHERE ticker = $${index}
            RETURNING *
        `;

        const updatedStock = await pool.query(query, values);

        if (updatedStock.rows.length === 0) {
            return res.status(404).json({ error: "Stock not found" });
        }

        res.json(updatedStock.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

async function deleteStock(req: Request, res: Response){
    try{
        const { ticker } = req.params;
        const deletedStock = await pool.query("DELETE FROM stocks WHERE ticker = $1 RETURNING *", [ticker]);
        res.json(deletedStock.rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}
export { getStocks, getStock, addStock, updateStock, deleteStock };
