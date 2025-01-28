import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.listen(PORT, () => {
  console.log(`Server Activated at ${PORT}`);
});
