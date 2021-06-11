import { Gebruikerstype } from "./gebruikerstype.model";

interface GebruikerBase{
    email: string;
    naam: string;
    voornaam: string;
    gebruikerstype: Gebruikerstype;
}


export interface Gebruiker extends GebruikerBase{
    _id:string
    
}

export interface GebruikerPost extends GebruikerBase{

}

export interface GebruikerPut extends GebruikerBase{
    
}
