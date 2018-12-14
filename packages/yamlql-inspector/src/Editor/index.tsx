import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { sleep } from '../common/sleep';

const NOOP = () => false;

export interface IShortcut {
  key: number[];
  run: Function;
}

export interface IEditorPorps {
  language?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (val: string) => void;
  getShortcuts?: () => IShortcut[];
  fullscreenLabels?: string[];
}

export default class Editor extends React.Component<IEditorPorps, any> {

  monaco: MonacoEditor;
  container: HTMLDivElement;

  state = { fullscreen: false };

  get editor() {
    return this.monaco && this.monaco.editor;
  }

  render() {
    const { language = 'yaml', readOnly, onChange, ...props } = this.props;
    return <div ref={ref => this.container = ref}
      style={{ height: '100%', position: 'relative' }}>
      <MonacoEditor
        {...props}
        onChange={onChange}
        ref={ref => this.monaco = ref}
        language={language}
        options={{
          automaticLayout: true,
          readOnly: readOnly,
          minimap: {
            enabled: false
          },
          folding: true,
          renderLineHighlight: 'none'
        }}
        editorDidMount={this.editorDidMount}
        theme="vs-light" />
      {this.renderFullscreen()}
    </div>;
  }

  renderFullscreen() {
    const { fullscreenLabels: labels = ['进入全屏', '退出全屏'] } = this.props;
    const { fullscreen } = this.state;
    return <span style={{
      position: 'absolute', zIndex: 1, bottom: 6, right: 20, fontSize: '12px',
      cursor: 'pointer', padding: '5px', lineHeight: '100%', opacity: .5,
      background: '#e3e3e3', borderRadius: '3px',
    }} onClick={this.toggleFullscreen}>
      {fullscreen ? labels[1] : labels[0]}
    </span>;
  }

  toggleFullscreen = () => {
    const { fullscreen } = this.state;
    if (fullscreen) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen();
    }
    this.setState({ fullscreen: !fullscreen });
  }

  editorDidMount = async () => {
    await sleep(0);
    const { editor } = this;
    if (!editor) return;
    editor.getModel().updateOptions({ tabSize: 2 });
    editor.layout();
    this.applyShortcuts(editor);
  }

  getSelectedText = async () => {
    await sleep(0);
    const { editor } = this;
    if (!editor) return;
    return editor.getModel().getValueInRange(editor.getSelection());
  }

  applyShortcuts = (editor: any) => {
    const { getShortcuts } = this.props;
    if (!getShortcuts) return;
    getShortcuts().forEach(item => {
      const name = 'shortcut-' + JSON.stringify(item.key) + Date.now();
      editor.addAction({
        id: name,
        label: name,
        keybindings: [].concat(item.key),
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: item.run || NOOP
      });
    });
  }

  static defaultProps = {
    getShortcuts: () => [
      { key: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S }
    ]
  }

}