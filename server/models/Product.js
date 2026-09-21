import mongoose from "mongoose";

// One product in the shop. Example: Rice, Price 70, Stock 100
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, default: "General" }
});

export default mongoose.model("Product", productSchema);
