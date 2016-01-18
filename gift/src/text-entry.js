import React from 'react'; //eslint-disable-line

const TextEntry = ({label, value, onChange, onAdd}) => {
  function evalKey(event) {
    // If you log the event object, all the properties will be null.
    // This is because React reuses the event objects for performance,
    // so the properties are null by the time the console looks them up.
    // Call onAdd if the return key is pressed.
    if (event.keyCode === 13) onAdd();
  }

  // &#x2795; is Unicode "heavy plus sign".
  return <div>
    <label>{label}</label>
    <input className="text-entry" type="text"
      value={value}
      onChange={onChange}
      onKeyDown={evalKey}/>
    <button className="text-entry-btn"
      disabled={!value}
      onClick={onAdd}>&#x2795;</button>
  </div>;
};

const PropTypes = React.PropTypes;
TextEntry.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default TextEntry;
