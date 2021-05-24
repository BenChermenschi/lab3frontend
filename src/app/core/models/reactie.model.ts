import { VragenLijst } from "./vragenLijst.model";

export interface ReactieBase {
    benMee: number;
    opnieuwUitleggen: boolean;
    welkOnderdeel: string;
    andereVragen: string;
    vragenlijst: VragenLijst;
}

export interface Reactie extends ReactieBase {
    _id: string
}

export interface ReactiePost extends ReactieBase {

}

export interface ReactiePut extends ReactieBase {

}