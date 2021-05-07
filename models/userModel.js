let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
    email:{type:String,required:true},
    naam:{type:String,required:true},
    wachtwoord:{type:String,required:true},
    usertype:{type:Schema.Types.ObjectId, ref:'UserType'}
})

module.exports = mongoose.model('User',schema);