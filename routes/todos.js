const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

const Todo = require("../models/Todo");


// ✅ Get all todos for the logged-in user
router.get("/todos", verifyToken, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});

// ✅ Add new todo
router.post("/todos", verifyToken, async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    userId: req.user.userId
  });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// ✅ Update todo (toggle)
router.put("/todos/:id", verifyToken, async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  res.json(updated);
});

// ✅ Delete todo
router.delete("/todos/:id", verifyToken, async (req, res) => {
  const deleted = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId
  });
  if (!deleted) return res.status(404).json({ error: "Todo not found" });
  res.json({ message: "Todo deleted", deleted });
});

module.exports = router;
