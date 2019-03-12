/// <reference types="monaco-editor" />
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
export interface IShortcut {
    key: number[];
    run: Function;
}
export interface IEditorPorps {
    language?: string;
    value?: string;
    readOnly?: boolean;
    onChange?: (val: string) => void;
    onReady?: (editor: any) => void;
    getShortcuts?: () => IShortcut[];
    fullscreenLabels?: string[];
}
export default class Editor extends React.Component<IEditorPorps, any> {
    monaco: MonacoEditor;
    container: HTMLDivElement;
    state: {
        fullscreen: boolean;
    };
    readonly editor: monaco.editor.ICodeEditor;
    render(): JSX.Element;
    renderFullscreen(): JSX.Element;
    toggleFullscreen: () => void;
    editorDidMount: () => Promise<void>;
    getSelectedText: () => Promise<string>;
    applyShortcuts: (editor: any) => void;
    static defaultProps: {
        getShortcuts: () => {
            key: number;
        }[];
    };
}
