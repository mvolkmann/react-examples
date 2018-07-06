import React, {Component} from 'react';
import MyConsumer from './counter-consumer';
import MyProvider from './counter-provider';

class App extends Component {
  render() {
    // Multiple providers can be nested and
    // each can manage a separate part of the app state.
    return (
      <div className="App">
        <MyProvider>
          <MyConsumer label="My Label" />
        </MyProvider>
      </div>
    );
  }
}

export default App;
