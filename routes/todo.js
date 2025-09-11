import express from "express";
const TodoRouter = express.Router();
import jwt from "jsonwebtoken";
import { Secretkey } from "../script.js"; 
import { Todomodel, Usermodel } from "../db.js";
function middleware(req,res,next){
   let token=req.headers.authorization;
   let response=jwt.verify(token,secretkey);
   if(response){
    req.userid=response.id;
     next();
   }else{
    res.status(404).json({message:"invalid token"});
   }
}
TodoRouter.get("/me",middleware,async (req,res)=>{
     const userid=req.userid;
     const response=await Usermodel.findOne({
      _id:userid,
     })
     if(response){
        res.status(200).json({
         name:response.name,
        })
     }
})
TodoRouter.get("/",middleware,async (req,res)=>{
     let userid=req.userid;
      const response=await Todomodel.find({
        userId:userid,
      })
      res.status(200).send(response);
})
TodoRouter.post("/addtodo",middleware,async (req,res)=>{
    let userid=req.userid;
    let {title,description,due,completed,status,priority}=req.body;
     await Todomodel.create({
        userId:userid,
        title:title,
        description:description,
        due:due,
        completed:completed,
        priority:priority,
        status:status,
     })
     res.status(200).json({message:"todo added"});
})
TodoRouter.patch("/updatetodo/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todomodel.findOneAndUpdate(
      { _id: id, userId: req.userid }, 
      { completed: true },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});
TodoRouter.delete("/deletetodo/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Todomodel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while deleting todo" });
    }
});

export { TodoRouter };