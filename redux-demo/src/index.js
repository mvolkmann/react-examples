import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Counter from './counter';
import reducer from './reducer';

// The only part of this that is application-specific
// is the use of the Counter component.
// Note how no props are passed to Counter.
// It gets all its props from the store using
// mapStateToProps at the bottom of counter.js.
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Counter />
    </Provider>,
    document.getElementById('root'));
}

const store = createStore(reducer);
store.subscribe(render);
render();
