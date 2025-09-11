import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt"; 
import { Usermodel } from "../db.js";


const userRouter = express.Router();
import { Secretkey } from "../script.js"; 
userRouter.post("/signup",async (req,res)=>{
    const reqbody=z.object({
        email:z.string().min(3).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(30).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
    })
    const body=reqbody.safeParse(req.body);
    if(!body){
        res.status(403).json({message:"wrong crendetials"});
        return;
    }
    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;
    const hashedpassword=await b.hash(password,5);
    let flag=0;
    try{await Usermodel.create({
         email:email,
         password:hashedpassword,
         name:name
    })}catch(err){
        res.status(404).json({message:"not signed up"});
        flag=1;
    }
    if(!flag){
    res.status(200).json({message:"you are signed up"});
    }
})

userRouter.post("/signin",async (req,res)=>{
      const reqbody=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(30).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
    })
    const body=reqbody.safeParse(req.body);
    if(!body){
        res.status(403).json({message:"wrong crendetials"});
        return;
    }
    const email=req.body.email;
    const password=req.body.password;
     const user=await Usermodel.findOne({
        email:email,
     })
     if(!user){
         res.json({
            message:"invalid user"
        })
     }
     const response=b.compare(password,user.password);
     if(response){
        const token=jwt.sign({id:user._id.toString()},secretkey);
        res.status(200).json({message:"you are signed in",token:token});
     }else{ 
        res.status(403).json({ message: "Incorrect creds"});
    }
})
export { userRouter };