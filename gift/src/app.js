import autobind from './autobind';
import GiftList from './gift-list';
import {Button, Modal} from 'react-bootstrap';
import NameSelect from './name-select';
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import TextEntry from './text-entry';

require('bootstrap-loader');
require('./app.scss');

class GiftApp extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"

    this.state = {
      focusId: 'nameInput',
      gifts: {},
      names: []
    };

    autobind(this, 'on');

    // Prebind event handling methods that need an argument.
    this.onChangeGift = this.onChange.bind(this, 'gift');
    this.onChangeName = this.onChange.bind(this, 'name');
    this.onChangeSelectedGift = this.onChange.bind(this, 'selectedGift');
    this.onChangeSelectedName = this.onChange.bind(this, 'selectedName');
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

  onAddGift() {
    const {gift, gifts, selectedName} = this.state;
    const giftsForName = gifts[selectedName] || [];
    if (giftsForName.includes(gift)) return;

    const newGiftsForName = giftsForName.concat(gift).sort();
    const newGifts =
      Object.assign({}, gifts, {[selectedName]: newGiftsForName});
    this.setState({
      gift: '',
      gifts: newGifts
    });
  }

  onAddName() {
    const {name, names} = this.state;
    if (names.includes(name)) return;

    this.setState({
      focusId: 'giftInput',
      name: '',
      names: names.concat(name).sort(),
      selectedName: name
    });
  }

  onChange(name, event) {
    this.setState({
      focusId: name + 'Input',
      [name]: event.target.value
    });
  }

  onCloseModal() {
    this.setState({confirmDelete: false});
  }

  onConfirmDeleteName() {
    this.setState({confirmDelete: true});
  }

  onDeleteGift() {
    const {gifts, selectedGift, selectedName} = this.state;
    const giftsForName = gifts[selectedName];
    const newGiftsForName = giftsForName.filter(g => g !== selectedGift);
    const newGifts =
      Object.assign({}, gifts, {[selectedName]: newGiftsForName});
    this.setState({
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

    this.setState({
      confirmDelete: false,
      names: newNames,
      gifts: newGifts,
      selectedName: newNames.length ? newNames[0] : null
    });
  }

  onSelectGift(event) {
    this.setState({selectedGift: event.target.value});
  }

  onSelectName(event) {
    this.setState({
      focusId: 'giftInput',
      selectedName: event.target.value
    });
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
      </div>
    );
  }
}

ReactDOM.render(<GiftApp/>, document.getElementById('content'));
