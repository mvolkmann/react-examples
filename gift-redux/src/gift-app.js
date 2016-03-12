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
    const iState = store.getState();
    const confirmDelete = iState.get('confirmDelete');
    const gift = iState.get('gift');
    const gifts = iState.get('gifts'); // a Map
    const name = iState.get('name');
    const names = iState.get('names'); // a List
    const selectedGift = iState.get('selectedGift');
    const selectedName = iState.get('selectedName');
    const giftsForName = selectedName ?
      gifts.get(selectedName) : Immutable.List();

    // Save focusId for use in focus method above.
    this.focusId = iState.get('focusId');
    if (!this.focusId) {
      this.focusId = 'nameInput';
      iState.set('focusId', this.focusId);
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
            his/her {giftsForName.size} gift ideas?
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

export default GiftApp;
