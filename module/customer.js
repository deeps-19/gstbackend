let mongo = require('mongoose');

let userSchema = mongo.Schema({
    Name: {type:String , require:true},
    Email: {type:String,require:true},
    Message: {type:String,require:true}
})

let userModel = mongo.model('customer', userSchema);
module.exports= userModel;