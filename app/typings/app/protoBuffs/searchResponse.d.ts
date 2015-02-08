interface ISearchResponse {
    searchResponse: Array<ISearchResult>;
}

interface ISearchResult {
    blurb: string;
    truck: ITruckProfile;
    menu: IMenu;
}