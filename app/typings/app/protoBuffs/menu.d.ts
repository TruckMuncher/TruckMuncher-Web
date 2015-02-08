interface IMenuResponse{
    menu: IMenu
}

interface IGetFullMenusResponse{
    menus: Array<IMenu>;
}

interface IMenu{
    truckId:string;
    categories: Array<ICategory>;
}