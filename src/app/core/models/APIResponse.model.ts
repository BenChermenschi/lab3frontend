export interface APIResponse {
    message: string;
}

export interface APIAuthResponse{
    token: string,
    isAdmin:boolean,
    vollenaam:string,
    _id:string
}