import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  categories: { type: String },
  fullName: { type: String },
  price: { type: String },
  quantity: { type: String },
  manufacture: { type: String },
  expire: { type: String },
});

const Products = mongoose.model("Products", userSchema);

export default Products;
