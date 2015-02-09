interface IAngularticsService{
    eventTrack(name: string, more?: {category?: string; label?: string}): void;
}

interface IAngularticsProvider {
    firstPageview(val: boolean): void;
    withAutoBase(val: boolean): void;
}