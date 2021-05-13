const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    naam:{type:String,required:true},
    aantalStudenten:{type:Number}
});

module.exports = mongoose.model('Klasgroep',schema);