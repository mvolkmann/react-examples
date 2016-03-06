// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

import GiftList from './gift-list';
import NameSelect from './name-select';
import React from 'react'; //eslint-disable-line
import {Button, Modal} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import TextEntry from './text-entry';

class GiftApp extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"

    this.state = {
      focusId: 'nameInput',
      gift: '',
      gifts: {},
      name: '',
      names: []
    };
    this.stateStack = [this.state];
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  focus() {
    const focusId = this.state.focusId;
    if (focusId) document.getElementById(focusId).focus();
  }

  render() {
    // This is rendered every time, but subcomponents are not.
    const {gift, gifts, name, names, selectedGift, selectedName} = this.state;
    const giftsForName = gifts[selectedName] || [];

    return (
      <div className="form-inline">
        <Modal bsSize="small"
          show={this.state.confirmDelete}
          onHide={this.onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {selectedName} and
            his/her {giftsForName.length} gift ideas?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onCloseModal}>Cancel</Button>
            <Button onClick={this.onDeleteName}>OK</Button>
          </Modal.Footer>
        </Modal>

        <h2>Gift App</h2>

        <TextEntry id="nameInput"
          label="New Name"
          value={name}
          onChange={this.onChangeName}
          onAdd={this.onAddName}/>

        <NameSelect names={names}
          selectedName={selectedName}
          onSelect={this.onSelectName}
          onDelete={this.onConfirmDeleteName}/>

        <TextEntry id="giftInput"
          label="New Gift"
          value={gift}
          onChange={this.onChangeGift}
          onAdd={this.onAddGift}/>

        <GiftList gifts={giftsForName}
          selectedGift={selectedGift}
          onSelect={this.onSelectGift}
          onDelete={this.onDeleteGift}/>

        <Button classNames="btn btn-default"
          disabled={this.stateStack.length < 2}
          onClick={this.onUndo}>Undo</Button>
      </div>
    );
  }
}

export default GiftApp;
