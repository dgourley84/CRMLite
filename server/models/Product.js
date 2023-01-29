import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    rating: { type: Number, default: 0 },
    supply: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;