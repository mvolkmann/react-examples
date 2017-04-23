import React, {Component} from 'react';
import {PropTypes as t} from 'prop-types';

class Greeting extends Component {
  state = {name: 'World'};
  static defaultProps = {greet: 'Hello'};
  static propTypes = {greet: t.string};

  setName(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setName(e)}
          />
        </div>
        <div className="message">
          {this.props.greet}, {this.state.name}!
        </div>
      </form>
    );
  }
}

export default Greeting;
