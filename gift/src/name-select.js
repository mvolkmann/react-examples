import React from 'react'; //eslint-disable-line

const NameSelect = ({names, selectedName, onSelect, onDelete}) => {
  const options = names.map(name => <option key={name}>{name}</option>);
  // &#x2796; is Unicode "heavy minus sign".
  return <div>
    <label>Selected Name</label>
    <select className="name-select"
      value={selectedName}
      onChange={onSelect}>
      {options}
    </select>
    <button className="name-delete-btn"
      disabled={!selectedName}
      onClick={onDelete}>&#x2796;</button>
  </div>;
};

const PropTypes = React.PropTypes;
NameSelect.propTypes = {
  names: PropTypes.array.isRequired,
  selectedName: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default NameSelect;
