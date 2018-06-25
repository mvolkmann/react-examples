import React, {Component} from 'react';
import {string} from 'prop-types';

class Greeting extends Component {
  static propTypes = {greet: string};
  static defaultProps = {greet: 'Hello'};
  state = {name: 'World'}; // initial state

  setName = event => this.setState({name: event.target.value});

  render() {
    return (
      <form>
        <div>
          <label>Name: </label>
          <input type="text" value={this.state.name} onChange={this.setName} />
        </div>
        <div>
          {this.props.greet}, {this.state.name}!
        </div>
      </form>
    );
  }
}

export default Greeting;
