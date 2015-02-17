interface ITruckMarker {
    truckProfile: ITruckProfile;
    id: string;
    coords: ICoordinates;
    metersFromUser?: number;
    options: any;
}