import { VragenLijst } from "./vragenLijst.model";

export interface Reactie {
    benMee: number;
    opnieuwUitleggen: boolean;
    welkOnderdeel: string;
    andereVragen: string;
    vragenlijst: VragenLijst;
}

