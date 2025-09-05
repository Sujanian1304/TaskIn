const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;
const todo=new Schema({
     userId:ObjectId,
     title:String,
     description:String,
    due:String,
    completed:Boolean,
    status:String,
    priority:String
})
const User=new Schema({
    name:{type:String,lowercase:true},
    email:{type:String,unique:true},
    password:String,
    todo:[todo],
})
const Usermodel=mongoose.model("user",User);
const Todomodel=mongoose.model("todo",todo);
module.exports={Usermodel,Todomodel};