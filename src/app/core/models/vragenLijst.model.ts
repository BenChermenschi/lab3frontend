import { Gebruiker } from "./gebruiker.model";
import { Klasgroep } from "./klasgroep.model";
import { Reactie } from "./reactie.model";
import { Vak } from "./vak.model";

export interface VragenLijstBase {
    gebruiker: Gebruiker;
    vak: Vak;
    klasgroepen: Klasgroep[];
    
}

 interface Totalen{
    benMee:BenMee;
    opnieuwUitleggen:OpnieuwUitleggen;
}

interface BenMee{
    aantal1:Number;
    aantal2:Number;
    aantal3:Number;
    aantal4:Number;
    aantal5:Number;
} 

interface OpnieuwUitleggen{
    aantalJa:Number;
    aantalNee:Number;
}



export interface VragenLijst extends VragenLijstBase {
    _id: string;
    datum: Date;
    reacties: Reactie[];
}

export interface VragenLijstPost extends VragenLijstBase {

}

export interface VragenLijstPut extends VragenLijstBase {

}

export interface VragenlijstDetailed extends VragenLijst{
    _id:string;
    datum:Date;
    reacties:Reactie[];
    totalen:Totalen;


}