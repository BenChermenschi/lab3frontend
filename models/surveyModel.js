let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
    teacher:{type:Schema.Types.ObjectId, ref:'User'},
    les:{type:Schema.Types.ObjectId, ref:'Les'},
    datum:{type:Date,required:true}
})

module.exports = mongoose.model('Survey',schema);