import React, {Component} from 'react';
import CounterConsumer from './counter-consumer';
import CounterProvider from './counter-provider';
import FontSizeProvider from './font-size-provider';

class App extends Component {
  render() {
    // Multiple providers can be nested and
    // each can manage a separate part of the app state.
    return (
      <div className="App">
        <FontSizeProvider>
          <CounterProvider>
            <CounterConsumer label="My Label" />
          </CounterProvider>
        </FontSizeProvider>
      </div>
    );
  }
}

export default App;
