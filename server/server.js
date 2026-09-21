import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import productRoutes from "./routes/productRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log("DB error:", e.message));

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

app.get("/", (req, res) => res.send("QuickPOS API running"));

// One-click demo data: GET /api/seed
app.get("/api/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) return res.json({ msg: "already has data", count });
  await Product.insertMany([
    { name: "Rice 1kg", price: 70, stock: 100, category: "Grocery" },
    { name: "Egg (dozen)", price: 150, stock: 50, category: "Grocery" },
    { name: "Milk 1L", price: 90, stock: 40, category: "Dairy" },
    { name: "Soap", price: 45, stock: 80, category: "Daily" },
    { name: "Chips", price: 25, stock: 200, category: "Snacks" }
  ]);
  res.json({ msg: "seeded" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
