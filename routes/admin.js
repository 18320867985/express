
var express=require("express");
var router=express.Router();
var  mainModel=require("../models/main");
var path=require("path");
var formidable=require("formidable"); //上传文件


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


router.get("/file",(req,res)=>{
    res.render("admin/file.html");
});
router.post("/file",(req,res)=>{

     let form =new formidable.IncomingForm();
     form.keepExtensions=true;
     form.uploadDir=path.resolve("./upload");
     form.multiples=false;
     form.parse(req,(err,fileds,files)=>{

         // 写入数据库
         if(err){
             throw err;
         }
         console.log("fileds:",fileds);
         console.log("files.file:",files.file);
         var _path=files.file.path;
         var p=path.dirname(_path);
         var extname=path.extname(_path);
         var basename=path.basename(_path);
         console.log("extname:",extname);
         console.log("basename:",basename);
     
     });
      res.send("上传成功！")
    
});

module.exports=router;