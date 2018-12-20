
const dbHelp = require("./_mongoose");

var schema = new dbHelp.mongoose.Schema({
    name: String,
    age: {type:Number,required:[true,"required888"],min:[10,"min 10"],max:[100,"max 100"]},
    sex: String,
    type:{type:dbHelp.mongoose.Schema.Types.ObjectId,ref:"CatType"}
});

var Cat =dbHelp.db.model("Cat", schema);

module.exports = Cat;