import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  className: { type: String },
  staffName: { type: String },
  days: { type: Array },
  startTime: { type: String },
  endTime: { type: String },
});

const classSchedule = mongoose.model("classSchedule", userSchema);

export default classSchedule;
