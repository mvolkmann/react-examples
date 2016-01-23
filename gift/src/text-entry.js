import deepEqual from './deep-equal';
import React from 'react'; //eslint-disable-line

function callIfReturnKey(fn, event) {
  // If you log the event object, all the properties will be null.
  // This is because React reuses the event objects for performance,
  // so the properties are null by the time the console looks them up.
  const isReturnKey = event.type === 'keydown' && event.keyCode === 13;
  if (isReturnKey) fn();
}

class TextEntry extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    const {id, label, onChange, onAdd, value} = this.props;
    console.log('text-entry.js render: label =', label);
    const onKeyDown = callIfReturnKey.bind(null, onAdd);

    // &#x2795; is Unicode "heavy plus sign".
    return <div>
      <label>{label}</label>
      <input className="form-control text-entry" type="text"
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}/>
      <button className="btn btn-default text-entry-btn"
        disabled={!value}
        onClick={onAdd}>&#x2795;</button>
    </div>;
  }
}

const PropTypes = React.PropTypes;
TextEntry.propTypes = {
  inputRef: PropTypes.string,
  label: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default TextEntry;
