import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    required: true,
  },
  reminderTime: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", TaskSchema);
