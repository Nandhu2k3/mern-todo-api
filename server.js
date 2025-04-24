const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://na5138:Aru%401968@cluster0.9cpvukp.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Route imports
const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes");
const todoRoutes = require("./routes/todos");

// API routes
app.use("/api", authRoutes);
app.use("/api", quoteRoutes);
app.use("/api", todoRoutes);

// ✅ Static frontend
app.use(express.static(path.join(__dirname, "public")));

// ✅ This should be the last route
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
