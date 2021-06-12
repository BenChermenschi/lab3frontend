import { Gebruiker } from "./gebruiker.model";
import { Klasgroep } from "./klasgroep.model";
import { Reactie } from "./reactie.model";
import { Vak } from "./vak.model";

export interface VragenLijstBase {
    gebruiker: Gebruiker;
    vak: Vak;
    klasgroepen: Klasgroep[];
    
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
    
}