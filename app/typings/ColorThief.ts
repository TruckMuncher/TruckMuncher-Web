declare var ColorThief;

interface IColorThiefService {
    getPalette(imgElement:any, num:number): Array<Array<number>>;
    getColor(imgElement:any):{r: number; g: number; b: number};
}
