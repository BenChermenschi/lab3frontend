import { Gebruiker } from "./gebruiker.model";
import { Klasgroep } from "./klasgroep.model";
import { Reactie } from "./reactie.model";
import { Vak } from "./vak.model";

export interface VragenLijst {
    gebruiker: Gebruiker;
    vak: Vak;
    datum: Date;
    klasgroepen: Klasgroep[];
    reacties: Reactie[];
}