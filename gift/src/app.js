import React from 'react';
import ReactDOM from 'react-dom';
import GiftList from './gift-list';
import NameSelect from './name-select';
import TextEntry from './text-entry';
import './app.scss';

class GiftApp extends React.Component {
  constructor() {
    super(); // must call this before accessing "this"

    this.state = {
      gifts: {},
      names: []
    };

    // Prebind the event handling methods.
    this.onAddGift = this.onAddGift.bind(this);
    this.onAddName = this.onAddName.bind(this);
    this.onChangeGift = this.onChange.bind(this, 'gift');
    this.onChangeName = this.onChange.bind(this, 'name');
    this.onChangeSelectedGift = this.onChange.bind(this, 'selectedGift');
    this.onChangeSelectedName = this.onChange.bind(this, 'selectedName');
    this.onDeleteGift = this.onDeleteGift.bind(this);
    this.onDeleteName = this.onDeleteName.bind(this);
    this.onSelectGift = this.onSelectGift.bind(this);
    this.onSelectName = this.onSelectName.bind(this);
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
      name: '',
      names: names.concat(name).sort(),
      selectedName: name
    });
  }

  onChange(name, event) {
    this.setState({[name]: event.target.value});
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
      names: newNames,
      gifts: newGifts,
      selectedName: newNames.length ? newNames[0] : null
    });
  }

  onSelectGift(event) {
    this.setState({selectedGift: event.target.value});
  }

  onSelectName(event) {
    this.setState({selectedName: event.target.value});
  }

  render() {
    const state = this.state;
    const selectedName = state.selectedName;
    const giftsForName = state.gifts[selectedName] || [];

    return (
      <div>
        <h2>Gift App</h2>

        <TextEntry label="New Name"
          value={state.name}
          onChange={this.onChangeName}
          onAdd={this.onAddName}/>

        <NameSelect names={state.names}
          selectedName={selectedName}
          onSelect={this.onSelectName}
          onDelete={this.onDeleteName}/>

        <TextEntry label="New Gift"
          value={state.gift}
          onChange={this.onChangeGift}
          onAdd={this.onAddGift}/>

        <GiftList gifts={giftsForName}
          selectedGift={state.selectedGift}
          onSelect={this.onSelectGift}
          onDelete={this.onDeleteGift}/>
      </div>
    );
  }
}

ReactDOM.render(<GiftApp/>, document.getElementById('content'));
