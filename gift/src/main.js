// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

import autobind from './autobind';
import GiftApp from './gift-app';
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

// Styling
import 'bootstrap-loader';
import './app.scss';

class Main extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"

    this.state = {
      gift: '',
      gifts: {},
      name: '',
      names: []
    };
    this.stateStack = [this.state];

    autobind(this, 'on');

    // Prebind event handling methods that need an argument.
    this.onChangeGift = this.onChange.bind(this, 'gift');
    this.onChangeName = this.onChange.bind(this, 'name');
    this.onChangeSelectedGift = this.onChange.bind(this, 'selectedGift');
    this.onChangeSelectedName = this.onChange.bind(this, 'selectedName');
  }

  onAddGift() {
    const {gift, gifts, selectedName} = this.state;
    const giftsForName = gifts[selectedName] || [];
    if (giftsForName.includes(gift)) return;

    const newGiftsForName = giftsForName.concat(gift).sort();
    const newGifts =
      Object.assign({}, gifts, {[selectedName]: newGiftsForName});
    this.pushState({
      gift: '',
      gifts: newGifts
    });
  }

  onAddName() {
    const {name, names} = this.state;
    if (names.includes(name)) return;

    this.pushState({
      focusId: 'giftInput',
      name: '',
      names: names.concat(name).sort(),
      selectedName: name
    });
  }

  onChange(name, event) {
    // Don't want this on stateStack.
    this.setState({
      focusId: name + 'Input',
      [name]: event.target.value
    });
  }

  onCloseModal() {
    // Don't want this on stateStack.
    this.setState({confirmDelete: false});
  }

  onConfirmDeleteName() {
    if (this.selectedNameHasGifts()) {
      // Don't want this on stateStack.
      this.setState({confirmDelete: true});
    } else {
      this.onDeleteName();
    }
  }

  onDeleteGift() {
    const {gifts, selectedGift, selectedName} = this.state;
    const giftsForName = gifts[selectedName];
    const newGiftsForName = giftsForName.filter(g => g !== selectedGift);
    const newGifts =
      Object.assign({}, gifts, {[selectedName]: newGiftsForName});
    this.pushState({
      gifts: newGifts,
      selectedGift: newGiftsForName.length ? newGiftsForName[0] : null
    });
  }

  onDeleteName() {
    const {gifts, names, selectedName} = this.state;
    const newNames = names.filter(n => n !== selectedName);

    // Remove the gifts for the selected name.
    const newGifts = Object.assign({}, gifts);
    delete newGifts[selectedName];

    this.pushState({
      confirmDelete: false,
      names: newNames,
      gifts: newGifts,
      selectedName: newNames.length ? newNames[0] : null
    });
  }

  onSelectGift(event) {
    this.pushState({selectedGift: event.target.value});
  }

  onSelectName(event) {
    this.pushState({
      focusId: 'giftInput',
      selectedName: event.target.value
    });
  }

  onUndo() {
    const stack = this.stateStack;
    stack.pop();
    const prevState = stack[stack.length - 1];
    this.setState(prevState);
  }

  pushState(stateMods) {
    this.setState(stateMods, () => this.stateStack.push(this.state));
  }

  /**
   * Determines if the currently selected name has at least one gift.
   */
  selectedNameHasGifts() {
    const {gifts, selectedName} = this.state;
    const giftsForName = gifts[selectedName];
    return giftsForName && giftsForName.length;
  }

  render() {
    // A lot of data and many functions are being passed to GiftApp.
    // This could be avoided by combining main.js and gift-app.js.
    // However, spliting them made it much easier to write
    // test/gift-app.spec.js.
    return <GiftApp app={this}/>;
  }
}

ReactDOM.render(<Main/>, document.getElementById('content'));
