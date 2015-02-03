declare var ColorThief;

interface IColorThiefService {
    getPalette(imgElement: any, num: number): Array<string>;
    getColor(imgElement: any):string;
}
