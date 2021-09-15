import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  userId: {
    type: Schema.ObjectId,
    ref: "user",
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
