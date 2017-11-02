// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import reducer from './reducer';
import './index.css';

// From create-react-app ...
//import registerServiceWorker from './registerServiceWorker';

// Using this to get elements makes Flow happy.
function getElement(id: string): Element {
  return ((document.getElementById(id): any): Element); // type cast
}

const store = createStore(reducer);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    getElement('root')
  );
}

store.subscribe(render);

render();

// From create-react-app ...
//registerServiceWorker();
