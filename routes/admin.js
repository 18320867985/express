
var express=require("express");
var router=express.Router();
var  main_model=require("../models/main");

/* admin */
router.get("/",async(req,res)=>{
    var  type= new main_model.CatType({name:"type",_id: new main_model.mongoose.Types.ObjectId()});
    var typeobj= await main_model.CatType.create(type) ;

    var cat= new  main_model.Cat({name:"hqs",age:10,sex:"nan",type:type._id});
    var  valdate=  cat.validateSync();
    if(!valdate){
        var obj= await cat.save();
    }
   var data= await main_model.Cat.find({}).populate("type");
   res.send(data);
    // var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];
    // res.render("admin/index.html",{items:items});
    
});

module.exports=router;