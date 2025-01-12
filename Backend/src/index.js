import connectDB from "./db/db.js";
import dotenv from "dotenv";
import express from "express";
const app = express();


dotenv.config({path: "./env",});

connectDB();

app.get("/", (req, res) => {  
     res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
     console.log(`app listening on port ${process.env.PORT}`);
})