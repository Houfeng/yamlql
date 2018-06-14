export declare class YamlQLError extends Error {
    private attach;
    constructor(opts: string | Error, attach?: any);
    toJSON(): any;
}
export default YamlQLError;
