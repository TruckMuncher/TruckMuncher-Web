interface IUser{
    id: string;
    fbUsername:string;
    twUsername:string;
    postToFb:boolean;
    postToTw:boolean;
}

interface IFavoriteResponse{
    favorites:Array<string>;
}