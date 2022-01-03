import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String },
  days: { type: String },
  amount: { type: String },
  installment: { type: String },
  plan: { type: String },
  tax: { type: String },
  membership: { type: String },
  amount: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
