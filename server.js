import mongoose from "mongoose"; // MongoDB se connect hone ke liye mongoose import kiya
import express from "express"; // Express server banane ke liye import kiya
import dotenv from "dotenv"; // .env file me jo secret config hai usse use karne ke liye
import { shortURL, getoriginalurl } from "./controllers/url.js"; // Controller ke functions import kiye
import path from "path"; // File path handle karne ke liye

dotenv.config(); // .env file ke variables ko load kar liya

const app = express(); // Express ka instance bana liya

// Yeh middleware form ke POST data ko body me extract karne ke kaam aata hai
app.use(express.urlencoded({ extended: true }));

// Public folder se static files (jaise CSS) serve karne ke liye
app.use(express.static(path.join(path.resolve(), "public")));

// MongoDB se connect ho rahe hain, URI .env file se liya
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Nodejs_Mastery_Course", // DB ka naam set kiya
  })
  .then(() => console.log("✅ MongoDB connected")) // Agar connection successful ho
  .catch((err) => console.log("❌ DB Error:", err)); // Agar error aaye toh yeh chalega

// Template engine set kiya - EJS ka use ho raha hai
app.set("view engine", "ejs");

// Home page dikhane ke liye route - jab user base URL pe aaye
app.get("/", (req, res) => {
  res.render("index", { shortUrL: null }); // Form render karo, initially koi short URL nahi hai
});

// Form submit hone pe shortURL function chalega
app.post("/submit", shortURL);

// Jab koi short URL open kare toh original URL pe redirect karo
app.get("/:shortcode", getoriginalurl);

// Server ko kisi port pe chalu karo - .env me se ya default 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`); // Server ka link console me print karo
});
