import React from 'react';

// Extending React.Component is not required.
// When is it needed?
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Greeting;
