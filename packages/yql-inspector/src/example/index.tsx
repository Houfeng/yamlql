import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Inspector from '../index';
import './index.less';

const root = document.getElementById('root');
const yqlUrl = (window as any).YQL_URL;

ReactDOM.render(<Inspector url={yqlUrl} />, root);