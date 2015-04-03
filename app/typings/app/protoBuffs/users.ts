interface IUser{
    id: string;
    fbUsername:string;
    twUsername:string;
    postToFb:string;
    postToTw:string;
}

interface IFavoriteResponse{
    favorites:Array<string>;
}