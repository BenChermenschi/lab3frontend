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
    aantal1:number;
    aantal2:number;
    aantal3:number;
    aantal4:number;
    aantal5:number;
} 

interface OpnieuwUitleggen{
    aantalJa:number;
    aantalNee:number;
}



export interface VragenLijst extends VragenLijstBase {
    _id: string;
    datum: Date;
    reacties: Reactie[];
}

export interface VragenLijstPost {
    vak: Vak;
    klasgroepen: Klasgroep[];
    gebruiker:string;

}

export interface VragenLijstPut extends VragenLijstBase {

}

export interface VragenlijstDetailed extends VragenLijst{
    _id:string;
    datum:Date;
    reacties:Reactie[];
    totalen:Totalen;
}

export interface VragenlijstRecentRequest{
    user_id:string;
}