
var express=require("express");
var router=express.Router();
var  mainModel=require("../models/main");
var path=require("path");
var formidable=require("formidable"); //上传文件


/* admin */
router.get("/",async(req,res)=>{

    // 聚合查询
    // mainModel.Cat.aggregate([
    //     {$match:{
    //             class:{
    //                 $in:[1,2,3]
    //             }
    //     }},
    //     {
    //         $group:{
    //             _id:"$class",
    //             count:{
    //                 $sum:1
    //             },
    //             avg:{
    //                 $avg:"$age"
    //             }
    //         }
    //     },
    //     {
    //         $match:{
    //             avg:{
    //                 $gte:12
    //             }
    //         }
    //     },
    //     {
    //         $sort:{
    //             _id:-1
    //         }
    //     },
    //     {
    //         $limit:1
    //     }
    // ]).then(data=>{
    // console.log(data);
    // });

    mainModel.Cat.mapReduce({
        query: {
            age:15
        },
        map: function () {
            return emit(this.class, { age2:this.age, });
        },
        reduce: function (key, v) {
            var sum = 0;
            v.forEach(function (item) {
                sum += item.age2;
            });
    
            return { key: key, count: v.length, sum: sum, avg: sum / v.length };
        }, 
       
    
    }).then(function (data) {
        console.log(data.results);
    });
    
    return;
     var  type= new mainModel.CatType({name:"type",_id: new mainModel.mongoose.Types.ObjectId(),num:24,dtl:{}});
        type.dtl={name:"hqs",desc:"desc"};
     var vd= type.validateSync();
    if(vd){
        console.log(vd)
        res.send({status:"error",code:0,data:vd});
        return;
    };
   var data= await mainModel.CatType.create(type);
    res.send({status:"success",code:1,data:data});
    
    // type.save((err)=>{
    //     console.log(err);
    // })
    //var typeobj= await mainModel.CatType.create(type) ;

    // var cat= new  mainModel.Cat({name:"hqs",age:10,sex:"nan",type:type._id});
    // var  valdate=  cat.validateSync();
    // if(!valdate){
    //     var obj= await cat.save();
 

//    var data= await mainModel.Cat.find({name:{$regex:""}}).populate("type",["name","__v"]);
//    res.send(data);
   
    // var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];
    // res.render("admin/index.html",{items:items});
    
});


router.get("/file",(req,res)=>{
    res.render("admin/file.html");
});


module.exports=router;