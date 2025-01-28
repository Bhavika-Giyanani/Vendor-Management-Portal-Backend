import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
dotenv.config();
connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
  console.log(`Server Activated at ${PORT}`);
});
