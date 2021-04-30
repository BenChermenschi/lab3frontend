var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    teacher:{type:Schema.Types.ObjectId, ref:'User'},
    les:{type:Schema.Types.ObjectId, ref:'Les'},
    datum:{type:Date,required:true}
})

module.exports = mongoose.model('Survey',schema);