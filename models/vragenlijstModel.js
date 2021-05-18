const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    gebruiker:{type:Schema.Types.ObjectId, ref:'Gebruiker'},
    vak:{type:Schema.Types.ObjectId, ref:'Vak'},
    datum:{type:Date},
    klasgroepen:{type:Array},
    responses:{type:Array}
})

module.exports = mongoose.model('Vragenlijst',schema);