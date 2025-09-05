const express=require("express");
const TodoRouter=express.Router();
const jwt=require("jsonwebtoken");
const secretkey="ilovevan";
const { Todomodel, Usermodel }=require("../db");
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
        userid:userid,
      })
      res.status(200).send(response);
})
TodoRouter.post("/addtodo",middleware,async (req,res)=>{
    let userid=req.userid;
    let {title,description,due,completed,status,priority}=req.body();
     await Todomodel.create({
        userid:userid,
        title:title,
        description:description,
        due:due,
        completed:completed,
        priority:priority,
        status:status,
     })
     res.status(200).json({message:"todo added"});
})
TodoRouter.put("/updatetodo",middleware,async(reqq,res)=>{
     let userid=req.userid;
     
})
module.exports={
   TodoRouter,
}