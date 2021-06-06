const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
let TotaalbenMee1;
let TotaalbenMee2;
let TotaalbenMee3;
let TotaalbenMee4;
let TotaalbenMee5;
let TotaalOpnieuwTrue;
let TotaalOpniewFalse;
const schema = new Schema({
    gebruiker:{type:Schema.Types.ObjectId, ref:'Gebruiker'},
    vak:{type:Schema.Types.ObjectId, ref:'Vak'},
    datum:{type:Date},
    klasgroepen:[{type:Schema.Types.ObjectId,ref:'Klasgroep'}],
    reacties:[{type:Schema.Types.ObjectId,ref:'Reactie'}],
    totalen:{
        benMee:{
            aantal1:{type:Number},
            aantal2:{type:Number},
            aantal3:{type:Number},
            aantal4:{type:Number},
            aantal5:{type:Number}
        },
        opnieuwUitleggen:{
            aantalJa:{type:Number},
            aantalNee:{type:Number}
        }
    }
})
schema.virtual('benMeeTotaal1').get(function(){
    return this.TotaalbenMee1;
}).set(function(input){
    this.TotaalbenMee1 = input;
});
schema.virtual('benMeeTotaal2').get(function(){
    return this.TotaalbenMee2;
}).set(function(input){
    this.TotaalbenMee2 = input;
});
schema.virtual('benMeeTotaal3').get(function(){
    return this.TotaalbenMee3;
}).set(function(input){
    this.TotaalbenMee3 = input;
});
schema.virtual('benMeeTotaal4').get(function(){
    return this.TotaalbenMee4;
}).set(function(input){
    this.TotaalbenMee4 = input;
});
schema.virtual('benMeeTotaal5').get(function(){
    return this.TotaalbenMee5;
}).set(function(input){
    this.TotaalbenMee5 = input;
});
module.exports = mongoose.model('VragenlijstOutput',schema);