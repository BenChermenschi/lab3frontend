export interface GebruikerstypeBase {
    naam: string;
}

export interface Gebruikerstype extends GebruikerstypeBase{
    _id:string
}
export interface GebruikerstypePost extends GebruikerstypeBase{

}
export interface GebruikerstypePut extends GebruikerstypeBase{
    
}
