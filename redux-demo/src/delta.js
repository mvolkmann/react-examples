import React, {Component} from 'react';
import {connect} from 'react-redux';
// Only using prop-types to keep this example simple.
// We would use Flow instead.
import t from 'prop-types';

class Delta extends Component {
  static propTypes = {
    delta: t.number.isRequired,
    onDeltaChange: t.func.isRequired
  };

  render() {
    return (
      <div>
        <label>Delta</label>
        <input
          type="number"
          onChange={this.props.onDeltaChange}
          value={this.props.delta}
        />
      </div>
    );
  }
}

// This makes desired state properties
// available to this component as props.
function mapState(state) {
  const {delta} = state;
  return {delta};
}

// Functions on the object this returns
// are passed as props to this component
// and can be used as event handlers.
const mapDispatch = dispatch => ({
  onDeltaChange(e) {
    dispatch({
      type: 'deltaChange',
      payload: Number(e.target.value)
    });
  }
});

export default connect(mapState, mapDispatch)(Delta);
