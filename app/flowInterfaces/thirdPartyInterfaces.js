declare class UnderscoreStatic {
    findWhere<T>(list:Array<T>, properties:{}):T;
    map<T, Y>(list:Array<T>, iteratee:(x:T) => Y):Array<Y>;
    findIndex<T>(list:Array<T>, checker:(x:T) => boolean):number;
    isNull(token:any):boolean;
    find<T>(list:Array<T>, check:(x:T) => boolean):T;
    contains<T>(list:Array<T>, properties:{}):boolean;
    filter<T>(list:Array<T>, check:(x:T) => boolean):Array<T>;
    clone<T>(x:T):T;
    sortBy<T>(list:Array<T>, opt:(x:T) => any):Array<T>;
    zip(first:Array<any>, second:Array<any>):Array<any>;
    isUndefined(x:any):boolean;
    some<T>(list:Array<T>, properties:{}):boolean;
    isNaN(x:any):boolean;
}

declare var _:UnderscoreStatic;

declare class AngularStatic {
    module(name:string, dependencies?:Array<any>):AngularModule;
}

declare var angular:AngularStatic;

declare class AngularModule{
    controller(name:string, injections:any): any;
    factory(name:string, injections:any): any;
    directive(name:string, injections:any): any;
}

declare class ColorThief {
}

declare var $:(x:any) => any;

declare class Base64Static{
    encode(x:string): string;
}

declare var base64:Base64Static;

