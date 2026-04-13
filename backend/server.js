import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(express.json()); // Allows us to accept JSON data in the body

app.use("/api/products", productRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
