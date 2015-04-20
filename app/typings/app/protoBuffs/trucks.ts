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
    approved:boolean;
    approvalPending:boolean;
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
    approved:boolean;
    approvalPending:boolean;
}

interface IActiveTruck {
    id: string;
    latitude: number;
    longitude: number;
    verified: boolean;
    score: number;
    userVote: boolean;
}

interface IActiveTrucksResponse {
    trucks: Array<IActiveTruck>;
}

interface IApprovalStatusResponse{
    status:string;
}
