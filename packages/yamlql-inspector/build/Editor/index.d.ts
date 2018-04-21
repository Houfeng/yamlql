/// <reference types="react" />
/// <reference types="monaco-editor" />
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
export interface IEditorPorps {
    language?: string;
    value?: string;
    readOnly?: boolean;
    onChange?: (val: string) => void;
}
export default class Editor extends React.Component<IEditorPorps, any> {
    monaco: MonacoEditor;
    readonly editor: monaco.editor.ICodeEditor;
    render(): JSX.Element;
    editorDidMount: () => Promise<void>;
    getSelectedText: () => Promise<string>;
}
