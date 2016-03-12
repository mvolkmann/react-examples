import deepEqual from './deep-equal';
import React from 'react'; //eslint-disable-line

class NameSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    //console.log('name-select.js render: entered');
    const {names, selectedName, onSelect, onDelete} = this.props;
    const options = names.map(name => <option key={name}>{name}</option>);
    const style = {visibility: options.length ? 'visible' : 'hidden'};

    // &#x2796; is Unicode "heavy minus sign".
    return <div>
      <label>Selected Name</label>
      <select className="form-control name-select"
        style={style}
        value={selectedName}
        onChange={onSelect}>
        {options}
      </select>
      <button className="btn btn-default name-delete-btn"
        style={style}
        disabled={!selectedName}
        onClick={onDelete}
        tabIndex="-1">&#x2796;</button>
    </div>;
  }
}

const {arrayOf, func, string} = React.PropTypes;
NameSelect.propTypes = {
  names: arrayOf(string).isRequired,
  onSelect: func.isRequired,
  onDelete: func.isRequired,
  selectedName: string
};

export default NameSelect;
