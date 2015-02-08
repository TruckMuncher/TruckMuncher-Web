interface ITruckMarker {
    truckProfile: ITruckProfile;
    id: string;
    icon: string;
    coords: ICoordinates;
    metersFromUser: number;
}