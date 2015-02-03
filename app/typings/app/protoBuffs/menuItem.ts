interface IMenuItem{
    orderInCategory: number;
    id:string;
    name:string;
    price:number;
    notes:string;
    tags:Array<string>;
    isAvailable:boolean;
}