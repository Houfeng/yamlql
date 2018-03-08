import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InspectorModel, IInspectorOptions } from './models';
import Editor from './Editor';
import DocViewer from './DocViewer';
import * as classNames from 'classnames';

import 'font-awesome/css/font-awesome.min.css';
import './assets/common.less';

const DockPanel = require('react-dock-panel');
const { model, binding } = require('mota');

export interface IInspectorPorps extends IInspectorOptions {
  url?: string;
  request?: (url: string, data?: any) => any;
}

@model(InspectorModel)
@binding
export default class Inspector extends React.Component<IInspectorPorps, any> {
  model: InspectorModel;

  componentDidMount() {
    (global as any).YQL_INSPECTOR = this;
    this.model.setOptions(this.props);
  }

  renderDocsButton() {
    const { toggleDocs, showDocs } = this.model;
    const names = classNames('docs', { active: showDocs });
    return <DockPanel dock="right" className={names} onClick={toggleDocs}>
      <i className="fa fa-book"></i>
      <span> Docs </span>
    </DockPanel>;
  }

  renderRunButton() {
    const { execute } = this.model;
    return <DockPanel dock="left" className="run" onClick={execute}>
      <i className="fa fa-play"></i>
      <span> Run </span>
    </DockPanel>;
  }

  render() {
    const { result, showDocs } = this.model;
    return <DockPanel className="yql-inspector">
      <DockPanel dock="top" className="toolbar-panel">
        {this.renderRunButton()}
        {this.renderDocsButton()}
      </DockPanel>
      <DockPanel dock="left" className="query-panel">
        <DockPanel dock="top" className="operation-panel">
          <Editor language="yaml" data-bind="operation" />
        </DockPanel>
        <DockPanel dock="bottom" className="variables-panel">
          <DockPanel dock="top" className="panel-bar">
            Variables
          </DockPanel>
          <DockPanel dock="fill" >
            <Editor language="json" data-bind="variables" />
          </DockPanel>
        </DockPanel>
      </DockPanel>
      <DockPanel dock="right" className="result-panel">
        <DocViewer visible={showDocs} />
        <Editor language="json" readOnly={true} value={result} />
      </DockPanel>
    </DockPanel>;
  }
}