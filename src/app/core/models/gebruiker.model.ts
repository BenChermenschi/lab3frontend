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
    wachtwoord:string
}

export interface GebruikerPut extends GebruikerBase{
    wachtwoord:string
}
export interface GebruikerPutNonPass extends GebruikerBase{

}
