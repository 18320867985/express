
const dbHelp = require("./_mongoose");

var childSchema = new dbHelp.mongoose.Schema({
    name:{ type:String,required:true},
    desc:String
});

var schema = new dbHelp.mongoose.Schema({
    name: String,
    date:{ type:Date,default:Date.now},
    num:{
        type:Number,
        required:true
    },
    dtl:{type:childSchema,required:true}
});


var CatType =dbHelp.db.model("CatType", schema);

module.exports = CatType;