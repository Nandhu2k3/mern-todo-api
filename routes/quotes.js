
// routes/quotes.js
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const axios = require("axios");

const router = express.Router();

router.get("/inspire", verifyToken, async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const quoteData = response.data[0]; // 👈 array format

    res.json({
      message: `Hello ${req.user.email}, here’s your quote of the moment:`,
      quote: quoteData.q,
      author: quoteData.a,
    });
  } catch (err) {
    console.error("❌ Quote fetch failed:", err.message);
    res.status(500).json({ error: "Quote service unavailable." });
  }
});

module.exports = router;
