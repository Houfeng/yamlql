export interface IInspectorOptions {
    url?: string;
    request?: (url: string, data?: any) => any;
}
export interface IInspectorParams {
    operation?: string;
    variables?: string;
}
export declare class InspectorModel {
    private options;
    params: IInspectorParams;
    result: string;
    selectedText: string;
    showDocs: boolean;
    private saveStateTimer;
    constructor(options: IInspectorOptions);
    private defaultRequest(url, data?);
    setOptions(options?: IInspectorOptions): void;
    execute: () => Promise<any>;
    toggleDocs: () => void;
    saveState: () => void;
    loadState: () => void;
}
