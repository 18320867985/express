
const dbHelp = require("./_mongoose");

var schema = new dbHelp.mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
});


var Cat =dbHelp.db.model("Cat", schema);
module.exports = Cat;