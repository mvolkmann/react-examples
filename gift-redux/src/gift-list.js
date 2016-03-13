import deepEqual from './deep-equal';
import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line

class GiftList extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    const {gifts, selectedGift, onSelect, onDelete} = this.props;

    const options = gifts.map(
      gift => <option key={gift}>{gift}</option>).toJS();

    // &#x2796; is Unicode "heavy minus sign".
    return <div>
      <select className="form-control gift-list"
        size="5"
        value={selectedGift}
        onChange={onSelect}>
        {options}
      </select>
      <button className="btn btn-default gift-delete-btn"
        disabled={!selectedGift}
        onClick={onDelete}
        tabIndex="-1">&#x2796;</button>
    </div>;
  }
}

const {func, instanceOf, string} = React.PropTypes;
GiftList.propTypes = {
  gifts: instanceOf(Immutable.List).isRequired,
  selectedGift: string,
  onSelect: func.isRequired,
  onDelete: func.isRequired
};

export default GiftList;
