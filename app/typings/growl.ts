interface IGrowlService {
    addErrorMessage(s: string): void;
    globalTimeToLive(time:number): void;
    onlyUniqueMessages(val:boolean): void;
    addSuccessMessage(s: string);
}