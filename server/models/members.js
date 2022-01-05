import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  mobile: { type: String },
  password: { type: String },
  package: { type: String },
  invi: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  paymentDate: { type: String },
  filepath: { type: String },
});

const Member = mongoose.model("Member", userSchema);

export default Member;
