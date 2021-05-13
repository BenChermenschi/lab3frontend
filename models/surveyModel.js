const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    teacher:{type:Schema.Types.ObjectId, ref:'Gebruiker'},
    les:{type:Schema.Types.ObjectId, ref:'Les'},
    datum:{type:Date,required:true}
})

module.exports = mongoose.model('Survey',schema);