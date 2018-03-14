/// <reference types="react" />
import * as React from 'react';
import './index.less';
export interface IDocViewerProps {
    visible?: boolean;
}
export default class DocViewer extends React.Component<IDocViewerProps, any> {
    render(): JSX.Element;
}
