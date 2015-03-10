interface ITruckProfilesResponse{
    trucks: Array<ITruckProfile>;
}

interface ITruckProfile {
    id:string;
    name:string;
    imageUrl:string;
    keywords:Array<string>;
    primaryColor:string;
    secondaryColor:string;
    description:string;
    phoneNumber:string;
}

class TruckProfile implements ITruckProfile{
    id:string;
    name:string;
    imageUrl:string;
    keywords:Array<string>;
    primaryColor:string;
    secondaryColor:string;
    description:string;
    phoneNumber:string;
}

interface IActiveTruck {
    id: string;
    latitude: number;
    longitude: number;
}

interface IActiveTrucksResponse {
    trucks: Array<IActiveTruck>;
}