const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    benJeMeeMetDeLeerstof:{type:Number},
    moetDeDocentDitOpnieuwUitleggen:{type:Boolean},
    zoJaWelkOnderdeel:{type:String},
    andereVragen:{type:String},
    vragenlijst:{type:Schema.Types.ObjectId, ref:'Vragenlijst'}
});

module.exports = mongoose.model('Respons',schema);