import mongoose from "mongoose";

// One bill/sale. Stores what was sold + total + cash payment.
const saleSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  change: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Sale", saleSchema);
