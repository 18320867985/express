
var express=require("express");
var router=express.Router();
var  mainModel=require("../models/main");

/* admin */
router.get("/",async(req,res)=>{
    var  type= new mainModel.CatType({name:"type",_id: new mainModel.mongoose.Types.ObjectId()});
    var typeobj= await mainModel.CatType.create(type) ;

    var cat= new  mainModel.Cat({name:"hqs",age:10,sex:"nan",type:type._id});
    var  valdate=  cat.validateSync();
    if(!valdate){
        var obj= await cat.save();
    }
   var data= await mainModel.Cat.find({}).populate("type");
   res.send(data);
   
    // var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];
    // res.render("admin/index.html",{items:items});
    
});

module.exports=router;