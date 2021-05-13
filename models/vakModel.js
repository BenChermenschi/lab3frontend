const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    naam:{type:String,required:true}
});

module.exports = mongoose.model('Vak',schema);