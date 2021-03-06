import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InspectorModel, IInspectorOptions } from './models';
import Editor from './Editor';
import DocViewer from './DocViewer';
import * as classNames from 'classnames';

import 'font-awesome/css/font-awesome.min.css';
import './assets/common.less';

const DockPanel = require('react-dock-panel');
const { model, binding, watch } = require('mota');

export interface IInspectorPorps extends IInspectorOptions {
  url?: string;
  request?: (url: string, data?: any) => any;
}

@model(InspectorModel)
@binding
export default class Inspector extends React.Component<IInspectorPorps, any> {

  model: InspectorModel;
  operation: Editor;
  varibles: Editor;
  result: Editor;

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

  execute = async () => {
    try {
      this.model.selectedText = await this.operation.getSelectedText();
      await this.model.execute();
      this.result.editor.setScrollTop(0);
    } catch (err) {
      alert(err);
    }
  }

  renderRunButton() {
    return <DockPanel dock="left" className="run" onClick={this.execute}>
      <i className="fa fa-play"></i>
      <span> Run </span>
    </DockPanel>;
  }

  @watch((model: InspectorModel) => model.params)
  onStateChanged() {
    this.model.saveState();
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
          <Editor ref={ref => this.operation = ref}
            language="yaml" data-bind="params.operation" />
        </DockPanel>
        <DockPanel dock="bottom" className="variables-panel">
          <DockPanel dock="top" className="panel-bar">
            Variables
          </DockPanel>
          <DockPanel dock="fill" >
            <Editor ref={ref => this.varibles = ref}
              language="json" data-bind="params.variables" />
          </DockPanel>
        </DockPanel>
      </DockPanel>
      <DockPanel dock="right" className="result-panel">
        <DocViewer visible={showDocs} />
        <Editor ref={ref => this.result = ref}
          language="json" readOnly={true} value={result} />
      </DockPanel>
    </DockPanel>;
  }
}