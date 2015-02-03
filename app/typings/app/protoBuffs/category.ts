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

class Category implements ICategory{
    id:string;
    name:string;
    notes:string;
    orderInMenu:number;
    menuItems:Array<IMenuItem>;

}