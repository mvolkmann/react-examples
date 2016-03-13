// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

import GiftList from './gift-list';
import Immutable from 'immutable';
import NameSelect from './name-select';
import React from 'react'; //eslint-disable-line
import {Button, Modal} from 'react-bootstrap';
import TextEntry from './text-entry';

class GiftApp extends React.Component {
  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    this.focus();
  }

  focus() {
    document.getElementById(this.focusId).focus();
  }

  render() {
    const {callbacks, store} = this.props;
    const state = store.getState();
    const confirmDelete = state.get('confirmDelete');
    const gift = state.get('gift');
    const gifts = state.get('gifts'); // a Map
    const name = state.get('name');
    const names = state.get('names'); // a List
    const selectedGift = state.get('selectedGift');
    const selectedName = state.get('selectedName');
    const giftsForName = selectedName ?
      gifts.get(selectedName) : Immutable.List();
    const giftCount = giftsForName ? giftsForName.size : 0;

    // Save focusId for use in focus method above.
    this.focusId = state.get('focusId');
    if (!this.focusId) {
      this.focusId = 'nameInput';
      state.set('focusId', this.focusId);
    }

    return (
      <div className="form-inline">
        <Modal bsSize="small"
          show={confirmDelete}
          onHide={callbacks.onCloseConfirmDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {selectedName} and
            his/her {giftCount} gift ideas?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={callbacks.onCloseConfirmDeleteModal}>
              Cancel
            </Button>
            <Button onClick={callbacks.onDeleteName}>OK</Button>
          </Modal.Footer>
        </Modal>

        <h2>Gift App</h2>

        <TextEntry id="nameInput"
          label="New Name"
          value={name}
          onChange={callbacks.onChangeName}
          onAdd={callbacks.onAddName}/>

        <NameSelect names={names}
          selectedName={selectedName}
          onSelect={callbacks.onSelectName}
          onDelete={callbacks.onConfirmDeleteName}/>

        <TextEntry id="giftInput"
          label="New Gift"
          value={gift}
          onChange={callbacks.onChangeGift}
          onAdd={callbacks.onAddGift}/>

        <GiftList gifts={giftsForName}
          selectedGift={selectedGift}
          onSelect={callbacks.onSelectGift}
          onDelete={callbacks.onDeleteGift}/>
      </div>
    );
  }
}

const {object} = React.PropTypes;
GiftApp.props = {
  callbacks: object.isRequired,
  store: object.isRequired,
};

export default GiftApp;
