// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

import autobind from './autobind';
import GiftApp from './gift-app';
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import rootReducer from './reducer';

// Styling
import 'bootstrap-loader';
import './app.scss';

/**
 * This class defines all the event handling callback functions
 * used by the components in this app.
 */
class Callbacks {
  constructor() {
    autobind(this, 'on');
  }

  dispatch(type, payload) {
    store.dispatch({type, payload});
  }

  onAddGift() {
    this.dispatch('addGift');
  }

  onAddName() {
    this.dispatch('addName');
  }

  onChangeGift(event) {
    this.dispatch('changeGift', event.target.value);
  }

  onChangeName(event) {
    this.dispatch('changeName', event.target.value);
  }

  onCloseConfirmDeleteModal() {
    this.dispatch('closeConfirmDeleteModal');
  }

  onConfirmDeleteName() {
    this.dispatch('confirmDeleteName');
  }

  onDeleteGift() {
    this.dispatch('deleteGift');
  }

  onDeleteName() {
    this.dispatch('deleteName');
  }

  onSelectGift(event) {
    this.dispatch('selectGift', event.target.value);
  }

  onSelectName(event) {
    this.dispatch('selectName', event.target.value);
  }
}

const callbacks = new Callbacks();

function render() {
  // A lot of functions are being passed to GiftApp.
  // This could be avoided by combining main.js and gift-app.js.
  // However, spliting them made it much easier to write
  // test/gift-app.spec.js.
  ReactDOM.render(
    <GiftApp callbacks={callbacks} store={store}/>,
    document.getElementById('content'));
}

const store = createStore(rootReducer);
store.subscribe(render);
render();
