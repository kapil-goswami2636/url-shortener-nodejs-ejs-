import mongoose from "mongoose"; // Mongoose import

// Schema banaya - 2 field honge: shortcode aur original long URL
const urlSCHEMA = new mongoose.Schema({
  shortcode: {
    type: String,
    required: true, // Yeh jaruri hai
    unique: true, // Duplicate nahi hona chahiye
  },
  longurl: {
    type: String,
    required: true, // Yeh bhi jaruri hai
    unique: true, // Same long URL repeat na ho
  },
});

// Model export kiya, naam diya "urls"
export const URLL = mongoose.model("urls", urlSCHEMA);
