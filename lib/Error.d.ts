export declare class YamlQLError extends Error {
    options: any;
    constructor(message: string, opts?: any);
    toJSON(): any;
}
export default YamlQLError;
