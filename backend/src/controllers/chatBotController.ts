import { Response, Request } from "express";
import { openai } from "../server.ts";

async function chatMessage(req: Request, res: Response){
    try {
        const { query } = req.body;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ error: "Invalid or missing 'query' in the request body." });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [{ role: "user", content: query }],
        });

        const messageContent = response.choices[0].message.content;

        if (!messageContent) {
            return res.status(500).json({ error: "Failed to retrieve a valid response from OpenAI." });
        }

        res.json({ message: messageContent });
    } catch (err: any) {
        console.error("Error during OpenAI API call:", err);

        if (err.response && err.response.status === 429) {
            return res.status(429).json({
                error: "Rate limit exceeded or insufficient quota.",
                details: err.response.data?.error?.message || "No additional details provided by OpenAI.",
            });
        }

        if (err.response) {
            return res.status(err.response.status).json({
                error: err.response.data?.error?.message || "An error occurred while communicating with OpenAI.",
            });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
}


export { chatMessage };
