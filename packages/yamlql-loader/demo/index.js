import test1 from './test1.yql';
import test3 from './test3.yql';
import React from 'react';
import ReactDOM from 'react-dom';

function query() {
  test1({ name: 0 });
}

function App() {
  return <button onClick={query}>click</button>;
}

ReactDOM.render(<App />, document.getElementById('root'));