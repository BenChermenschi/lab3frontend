import { Gebruikerstype } from "./gebruikerstype.model";

export interface Gebruiker {
    email: string;
    naam: string;
    voornaam: string;
    gebruikerstype: Gebruikerstype;
}
