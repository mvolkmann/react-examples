// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

import Greeting from './greeting';
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Greeting greet="Hola"/>,
  document.getElementById('content'));
