import * as React from 'react';
import { InspectorModel, IInspectorOptions } from './models';
import Editor from './Editor';
import 'font-awesome/css/font-awesome.min.css';
import './assets/common.less';
export interface IInspectorPorps extends IInspectorOptions {
    url?: string;
    request?: (url: string, data?: any) => any;
}
export default class Inspector extends React.Component<IInspectorPorps, any> {
    model: InspectorModel;
    operation: Editor;
    varibles: Editor;
    result: Editor;
    componentDidMount(): void;
    renderDocsButton(): JSX.Element;
    execute: () => Promise<void>;
    renderRunButton(): JSX.Element;
    onStateChanged(): void;
    render(): JSX.Element;
}
