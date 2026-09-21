import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products -> list all
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.json(products);
});

// POST /api/products -> add one {name, price, stock, category}
router.post("/", async (req, res) => {
  const p = await Product.create(req.body);
  res.json(p);
});

// PUT /api/products/:id -> edit one
router.put("/:id", async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// DELETE /api/products/:id -> delete one
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
