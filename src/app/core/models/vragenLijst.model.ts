import { Gebruiker } from "./gebruiker.model";
import { Klasgroep } from "./klasgroep.model";
import { Reactie } from "./reactie.model";
import { Vak } from "./vak.model";

export interface VragenLijstBase {
    gebruiker: Gebruiker;
    vak: Vak;
    datum: Date;
    klasgroepen: Klasgroep[];
    reacties: Reactie[];
}

export interface VragenLijst extends VragenLijstBase {
    _id: string
}

export interface VragenLijstPost extends VragenLijstBase {

}

export interface VragenLijstPut extends VragenLijstBase {

}