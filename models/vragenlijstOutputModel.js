const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

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
});
/*
schema.virtual('benMeeTotaal1').get(function(){
    return this.schema.totalen.benMee.aantal1;
}).set(function(input){
    this.aantal1 = input;
});
schema.virtual('benMeeTotaal2').get(function(){
    return this.schema.totalen.benMee.aantal2;
}).set(function(input){
    this.aantal2 = input;
});
schema.virtual('benMeeTotaal3').get(function(){
    return this.schema.totalen.benMee.aantal3;
}).set(function(input){
    this.aantal3 = input;
});
schema.virtual('benMeeTotaal4').get(function(){
    return this.schema.totalen.benMee.aantal4;
}).set(function(input){
    this.aantal4 = input;
});
schema.virtual('benMeeTotaal5').get(function(){
    return this.schema.totalen.benMee.aantal5
}).set(function(input){
    this.aantal5 = input;
});
*/




module.exports = mongoose.model('VragenlijstOutput',schema);