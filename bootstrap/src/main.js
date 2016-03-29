import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

import App from './app';
console.log('main.js x: App =', App);

// Styling
import 'bootstrap-loader';
import './app.scss';

ReactDOM.render(<App/>, document.getElementById('content'));
