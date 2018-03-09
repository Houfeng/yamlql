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

  render() {
    const { language = 'yaml', readOnly, onChange, ...props } = this.props;
    return <div style={{ height: '100%' }}>
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
    </div>;
  }

  editorDidMount = () => {
    this.monaco.editor.getModel().updateOptions({
      tabSize: 2
    });
    this.monaco.editor.layout();
  }

}