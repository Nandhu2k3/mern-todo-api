const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
    inProgress: { type: Boolean, default: false },
    deadline: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });

module.exports = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
