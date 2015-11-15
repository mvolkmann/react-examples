import React from 'react'; //eslint-disable-line

/*
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Greeting;
*/
export default props =>
  <h1>Hello, {props.name}!</h1>;
