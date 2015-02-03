interface IActiveTruck {
    id: string;
    latitude: number;
    longitude: number;
}

interface IActiveTrucksResponse {
    trucks: Array<IActiveTruck>;
}