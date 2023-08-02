import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/todolist",{useNewUrlParser: true,useUnifiedTopology: true});
const itemschema={name:String};
const sample=mongoose.model("sample",itemschema)
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",async(req,res)=>{
    sample.find({},(err,fitems)=>{
        res.render("./index.ejs",{tasks:fitems});
    })
});
app.post("/add",(req,res)=>{
    const todo=req.body["todo"];
    const item=new sample({name:todo});
    item.save();
    res.redirect("/");
})
app.post("/delete",(req,res)=>{
    const checkboxid=req.body["check"];
    console.log(checkboxid);
    console.log("jjhg");
    sample.findByIdAndRemove(checkboxid,(err)=>{    
        if(!err){
            console.log("successfully deleted element:");
            res.redirect("/");
        }
    })
 })
app.listen(3000,()=>{
    console.log("server running on port 3000");
})