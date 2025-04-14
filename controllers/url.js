import { URLL } from "../model/url.js"; // Mongoose model import kiya
import shortid from "shortid"; // Unique short code banane ke liye library use ki

// Jab user form bharta hai aur URL submit karta hai
export const shortURL = async (req, res) => {
  const longurl = req.body.longurl; // Form se original URL liya

  // Pehle check karo ki yeh longurl pehle se DB me toh nahi hai
  const existingURL = await URLL.findOne({ longurl });

  if (existingURL) {
    // Agar already DB me hai toh wahi short URL user ko dikha do
    console.log("✅ Already exists:", existingURL);
    return res.render("index", {
      shortUrL: `${process.env.BASE_URL}/${existingURL.shortcode}`, // BASE_URL + shortcode milake link banao
    });
  }

  // Naya shortcode generate karo agar URL naye hai
  const shortcode = shortid.generate();

  // Naya URL object create karo
  const newurl = new URLL({
    shortcode,
    longurl,
  });

  // Usko database me save karo
  await newurl.save();
  console.log("✅ New URL saved:", newurl);

  // User ko short URL dikha do
  res.render("index", {
    shortUrL: `${process.env.BASE_URL}/${shortcode}`,
  });
};

// Jab koi short URL access kare
export const getoriginalurl = async (req, res) => {
  const shortcode = req.params.shortcode; // URL se code nikala

  // Us shortcode ke basis pe original URL find karo
  const originalurl = await URLL.findOne({ shortcode });

  if (originalurl) {
    return res.redirect(originalurl.longurl); // Mil gaya toh us pe redirect karo
  } else {
    res.status(404).json({ message: "❌ Invalid shortcode" }); // Nahi mila toh 404 dikhao
  }
};
