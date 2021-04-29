var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    id:{type:String, required:true, unique:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    usertype:{type:Schema.Types.ObjectId, ref:'UserType'}
})

module.exports = mongoose.model('User',schema);