var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    email:{type:String,required:true},
    naam:{type:String,required:true},
    wachtwoord:{type:String,required:true},
    usertype:{type:Schema.Types.ObjectId, ref:'UserType'}
})

module.exports = mongoose.model('User',schema);