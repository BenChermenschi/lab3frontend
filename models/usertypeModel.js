let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
    naam:{type:String,required:true}
})

module.exports = mongoose.model('UserType',schema);