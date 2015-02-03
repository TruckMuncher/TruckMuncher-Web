declare var ColorThief: IColorThiefService;

interface IColorThiefService {
    getPalette(imgElement: any, num: number): Array<string>;
    getColor(imgElement: any):string;
}
