const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    benMee:{type:Number},
    opnieuwUitleggen:{type:Boolean},
    welkOnderdeel:{type:String},
    andereVragen:{type:String},
    vragenlijst:{type:Schema.Types.ObjectId, ref:'Vragenlijst'}
});

module.exports = mongoose.model('Reactie',schema);