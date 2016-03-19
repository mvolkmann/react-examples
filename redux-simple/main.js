import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

const Counter = ({number, onIncrement}) =>
  <div>
    {number} <button onClick={onIncrement}>+</button>
  </div>;

const {func, number} = React.PropTypes;
Counter.propTypes = {
  number: number.isRequired,
  onIncrement: func.isRequired
};

function increment() {
  store.dispatch({type: 'increment'});
}

function render() {
  ReactDOM.render(
    <Counter
      number={store.getState().number}
      onIncrement={increment}/>,
    document.getElementById('content'));
}

function reducer(state = {number: 0}, action) {
  switch (action.type) {
    case 'increment':
      return Object.assign({}, state, {number: state.number + 1});
    default:
      return state;
  }
}

const store = createStore(reducer);
store.subscribe(render);
render();
