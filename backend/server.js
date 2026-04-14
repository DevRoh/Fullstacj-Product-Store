import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json()); // Allows us to accept JSON data in the body

const __dirname = path.resolve();

app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
