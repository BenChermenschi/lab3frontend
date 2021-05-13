const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    email:{type:String,required:true},
    naam:{type:String,required:true},
    wachtwoord:{type:String,required:true},
    gebruikerstype:{type:Schema.Types.ObjectId, ref:'GebruikersType'}
})

module.exports = mongoose.model('Gebruiker',schema);