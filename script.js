const express=require("express");
const app=express();
app.use(express.json());
const cors=require("cors");
app.use(cors());
const {userRouter}=require("./routes/user");
const {TodoRouter}=require("./routes/todo");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://piyush1304kumar:R2AXPWhWTQpV2v3i@cluster0.tl8runz.mongodb.net/Todo-project");
app.use("/user",userRouter);
app.use("/todo",TodoRouter);
app.listen(3000,()=>{
    console.log("listening in route 3000");
})