
const dbHelp = require("./_mongoose");

var schema = new dbHelp.mongoose.Schema({
    name: String,
   
});


var CatType =dbHelp.db.model("CatType", schema);

module.exports = CatType;