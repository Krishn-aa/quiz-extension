import express from "express";
import run from "./gemini-service.js"
import "./lib/envLoad.js";
import cors from 'cors';

const app = express();
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
const port = process.env.PORT;

app.get("/prompt", cors(corsOptions), async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send("Prompt query parameter is required.");
    }

    try {
        const responseText = await run(query);
        res.send(responseText);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})