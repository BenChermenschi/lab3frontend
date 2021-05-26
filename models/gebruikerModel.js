const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    email:{type:String,required:true},
    naam:{type:String,required:true},
    voornaam:{type:String,required:true},
    wachtwoord:{type:String,required:true,select: false },
    gebruikerstype:{type:Schema.Types.ObjectId, ref:'GebruikersType'}
});

schema.virtual('vollenaam').get(function(){
    return this.voornaam + ' ' + this.naam;
});

module.exports = mongoose.model('Gebruiker',schema);