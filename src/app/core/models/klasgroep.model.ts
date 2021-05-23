export interface Klasgroep {
    _id: string
    naam: string,
    aantalStudenten: number;
}

export interface KlasgroepPost {
    naam: string,
    aantalStudenten: number;
}

export interface KlasgroepPut {
    naam: string,
    aantalStudenten: number;
}