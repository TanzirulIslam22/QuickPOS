import express from "express";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const sales = await Sale.find().sort({ date: -1 }).limit(50);
  res.json(sales);
});


router.post("/", async (req, res) => {
  const { items, paidAmount } = req.body; // items from cart + cash given
  let total = 0;
  const billItems = [];

  for (const it of items) {
    const p = await Product.findById(it.productId);
    if (!p || p.stock < it.qty) {
      return res.status(400).json({ error: `Not enough stock: ${p?.name}` });
    }
    p.stock -= it.qty;
    await p.save();
    total += p.price * it.qty;
    billItems.push({ productId: p._id, name: p.name, price: p.price, qty: it.qty });
  }

  const paid = Number(paidAmount) || total; // default: exact payment if not provided (backward compatible)
  if (paid < total) {
    return res.status(400).json({ error: `Insufficient payment. Total ${total} Tk, paid ${paid} Tk` });
  }
  const change = paid - total;

  const sale = await Sale.create({ items: billItems, total, paidAmount: paid, change });
  res.json(sale);
});

export default router;
