
var express=require("express");
var router=express.Router();

/* admin */
router.get("/",(req,res)=>{
    var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2},{ title: "google", id: 3}];
    res.render("admin/index.html",{items});
    
});

module.exports=router;