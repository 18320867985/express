
var express=require("express");
var router=express.Router();
var  main_model=require("../models/main");


/* admin */
router.get("/",async(req,res)=>{

    var cat= new  main_model.Cat({name:"hqs",age:24,sex:"nan"});
   var data= await main_model.Cat.find({});
   console.log(JSON.stringify(data))
    var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];
    res.render("admin/index.html",{items:data});
    
});

module.exports=router;