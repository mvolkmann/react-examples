import React, {Component} from 'react';

// Context is an object with Provider and Consumer properties.
const initialState = {fontSize: 10};
export const Context = React.createContext();

class FontSizeProvider extends Component {
  state = initialState;
  // Defining methods outside render method
  // so they aren't recreated on every render.
  methods = {
    increase: () => this.setState(state => ({fontSize: state.fontSize + 2}))
  };

  render() {
    const value = {...this.state, ...this.methods};
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export default FontSizeProvider;
