import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(__dirname));

import {userRouter} from "./routes/user.js";
import {TodoRouter} from "./routes/todo.js";
import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL;
const Secretkey = process.env.JWT_SECRET;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));
app.use("/user",userRouter);
app.use("/todo",TodoRouter);
console.log("Todo routes mounted");
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export { Secretkey};