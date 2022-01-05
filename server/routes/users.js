import express from "express";
const router = express.Router();
import User from "../models/users.js";
import Member from "../models/members.js";
import Staff from "../models/staff.js";
import classSchedule from "../models/classSchedule.js";

router.get("/", () => {
  res.send("test");
});

// -----------------------
// MEMBERSHIP
// -----------------------

router.patch("/adduser", async (req, res) => {
  const formData = req.body;
  const newUser = new User(formData);
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
});

router.get("/getusers", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({ data: allUsers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// -----------------------
// MEMBERS
// -----------------------

router.patch("/addmember", async (req, res) => {
  const formData = req.body;
  const newUser = new Member(formData);
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
});

router.get("/getmembers", async (req, res) => {
  try {
    const allUsers = await Member.find();
    res.json({ data: allUsers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.delete("/deletemember/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Member.findByIdAndDelete(id);
    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// -----------------------
// STAFF
// -----------------------

router.patch("/addstaff", async (req, res) => {
  const formData = req.body;
  const newUser = new Staff(formData);
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
});

router.get("/getstaffs", async (req, res) => {
  try {
    const allUsers = await Staff.find();
    res.json({ data: allUsers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.delete("/deletestaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// -----------------------
// CLASS SCHEDULE
// -----------------------

router.patch("/addclass", async (req, res) => {
  const formData = req.body;
  const newUser = new classSchedule(formData);
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
});

router.get("/getclasses", async (req, res) => {
  try {
    const allUsers = await classSchedule.find();
    res.json({ data: allUsers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.delete("/deleteclass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await classSchedule.findByIdAndDelete(id);
    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
