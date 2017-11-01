// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This makes Flow happy.
function getElement(id: string): Element {
  return ((document.getElementById(id): any): Element);
}

ReactDOM.render(<App />, getElement('root'));
registerServiceWorker();
