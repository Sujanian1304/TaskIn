import mongoose from "mongoose";

const { Schema, Types } = mongoose;
const ObjectId = Types.ObjectId;

const todoSchema = new Schema({
  userId: ObjectId,
  title: String,
  description: String,
  due: String,
  completed: Boolean,
  status: String,
  priority: String,
});

const userSchema = new Schema({
  name: { type: String, lowercase: true },
  email: { type: String, unique: true },
  password: String,
  todo: [todoSchema],
});

const Usermodel = mongoose.model("user", userSchema);
const Todomodel = mongoose.model("todo", todoSchema);

export { Usermodel, Todomodel };
