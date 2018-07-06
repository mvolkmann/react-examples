import React, {Component} from 'react';

// Context is an object with Provider and Consumer properties.
const initialState = {counter: 0};
//export const Context = React.createContext(initialState);
export const Context = React.createContext();

class MyProvider extends Component {
  state = initialState;
  // Defining methods outside render method
  // so they aren't recreated on every render.
  methods = {
    increment: (event, delta = 1) =>
      this.setState(state => ({counter: state.counter + delta}))
  };

  render() {
    const value = {...this.state, ...this.methods};
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export default MyProvider;
