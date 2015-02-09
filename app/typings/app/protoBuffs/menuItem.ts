interface IGetMenuItemResponse{
    menuItem: IMenuItem;
}

interface IMenuItem{
    orderInCategory: number;
    id:string;
    name:string;
    price:number;
    notes:string;
    tags:Array<string>;
    isAvailable:boolean;
}

class MenuItem implements IMenuItem{
    orderInCategory:number;
    id:string;
    name:string;
    price:number;
    notes:string;
    tags:Array<string>;
    isAvailable:boolean;

}