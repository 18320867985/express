var express = require('express');
var router = express.Router();
var dbHelp=require("../lib/dbHelp");

/* GET home page. */
var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];

router.get('/', async function(req, res, next) {
  var data= await dbHelp.find("news",{}).catch();
  //var cookie=res.cookie("name","hqs",{ maxAge:90*1000,httpOnly:true});

  console.log(req.session["name"]={name:"hqs",age:28});
  res.render('index.html', {items:data});
});

router.get("/data", async (req,res,next)=>{
  var data= await dbHelp.find("news",{}).catch();
  res.json({method:req.method,data:data});
})

router.post("/data", async (req,res,next)=>{

  var data= await dbHelp.insert("news",{
    name:req.body.name
  }).catch();
  res.json({method:req.method,data:data});
})
router.put("/data", async (req,res,next)=>{

  var data= await dbHelp.find("news",{
    name:"hqs2"
  }).catch();
  res.json({method:req.method,data:data});
})

router.delete("/data", async (req,res,next)=>{
var   id=req.body.id;
  var data= await dbHelp.delete("news",{
    _id:dbHelp.mongodb.ObjectID(id)
  }).catch();
  res.json({method:req.method,data:data});
})

module.exports = router;
