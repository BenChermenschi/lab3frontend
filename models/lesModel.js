var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    naam:{type:String,required:true}
});
//,
//datum:{type:Date,required:true}

module.exports = mongoose.model('Les',schema);