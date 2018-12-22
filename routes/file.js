
var express=require("express");
var router=express.Router();
var  mainModel=require("../models/main");
var path=require("path");
var formidable=require("formidable"); //上传文件

router.get("/",(req,res)=>{
    res.render("admin/file.html");
});

router.post("/",(req,res)=>{

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
         res.send("上传成功--写入数据库！")
     
     });
    
    
});

module.exports=router;