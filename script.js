const express=require("express");
const path =require("path");
const app=express();
const { fileURLToPath } = require('url');
const { dirname }= ('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
const cors=require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(__dirname));

const {userRouter}=require("./routes/user");
const {TodoRouter}=require("./routes/todo");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://piyush1304kumar:R2AXPWhWTQpV2v3i@cluster0.tl8runz.mongodb.net/Todo-project");
app.use("/user",userRouter);
app.use("/todo",TodoRouter);
console.log("Todo routes mounted");
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));