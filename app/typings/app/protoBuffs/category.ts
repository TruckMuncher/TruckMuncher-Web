interface IGetCategoryResponse{
    category: ICategory;
}
interface ICategory {
    id:string;
    name:string;
    notes:string;
    orderInMenu:number;
    menuItems:Array<IMenuItem>;
}