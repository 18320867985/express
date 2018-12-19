
const mongoose = require("mongoose");

const url="mongodb://localhost:27017/";
const database="admin";

var db=mongoose.createConnection(url+database);
db.on("open",function(err,data){
    console.log("mongodb connection success ");
});

db.on('error', console.error.bind(console, 'connection error:'));


exports.mongoose=mongoose;
exports.db=db;