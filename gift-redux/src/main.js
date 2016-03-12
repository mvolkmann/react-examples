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

class Main extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"
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

  render() {
    // A lot of functions are being passed to GiftApp.
    // This could be avoided by combining main.js and gift-app.js.
    // However, spliting them made it much easier to write
    // test/gift-app.spec.js.
    return <GiftApp callbacks={this} store={store}/>;
  }
}

function render() {
  ReactDOM.render(<Main/>, document.getElementById('content'));
}

const store = createStore(rootReducer);
store.subscribe(render);
render();
