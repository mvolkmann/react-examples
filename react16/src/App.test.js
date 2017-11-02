// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';
import {initialState} from './reducer';

import './setup-tests';

test('renders without crashing', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.createElement('div'));
});
