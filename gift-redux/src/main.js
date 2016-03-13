// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

// Unique imports for this app
import GiftApp from './gift-app';
import reducer from './reducer';
import giftEventHandlers from './gift-event-handlers';
import nameEventHandlers from './name-event-handlers';

// Styling
import 'bootstrap-loader';
import './app.scss';

// Common imports for every app
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {setupStore} from './redux-util';

// This object defines all the event handling functions
// used by the components in this app.
const handlers = Object.assign({}, giftEventHandlers, nameEventHandlers);

function render() {
  // A lot of functions are being passed to GiftApp.
  // This could be avoided by combining main.js and gift-app.js.
  // However, spliting them made it much easier to write
  // test/gift-app.spec.js.
  ReactDOM.render(
    <GiftApp handlers={handlers} store={store}/>,
    document.getElementById('content'));
}

const store = setupStore(reducer, render);
render();
