/* global describe, it */
import expect from 'expect';
import reducer from '../public/reducer.js';
import {createStore} from 'redux';

describe('dispatch', () => {
  it('should process a series of actions', () => {
    const store = createStore(reducer);

    const actions = [
      {type: 'addTodo', payload: {_id: '1', text: 'Get milk'}},
      {type: 'addTodo', payload: {_id: '2', text: 'Take out trash'}},
      {type: 'addTodo', payload: {_id: '3', text: 'Make lunch'}},
      {type: 'toggleDone', payload: {_id: '1'}},
      {type: 'deleteTodo', payload: {_id: '3'}},
      {type: 'archiveCompleted'},
      {type: 'textChange', payload: {text: 'I typed this'}},
      {type: 'error', payload: 'Something went wrong'}
    ];

    for (const action of actions) {
      store.dispatch(action);
    }

    const iState = store.getState();
    const iTodos = iState.get('todos');
    expect(iTodos.size).toBe(1);
    const iTodo = iTodos.get('2');
    expect(iTodo.get('_id')).toBe('2');
    expect(iTodo.get('text')).toBe('Take out trash');
  });
});
