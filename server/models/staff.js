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
  salary: { type: String },
  attendance: { type: String },
});

const Staff = mongoose.model("Staff", userSchema);

export default Staff;
