/* global describe, it */
import Immutable from 'immutable';
import expect from 'expect';
import reducer from '../public/reducer.js';

describe('reducer', () => {
  it('should process add action', () => {
    const _id = '1';
    const text = 'Get milk';
    let iState = Immutable.Map({text});
    const action = {type: 'addTodo', payload: {_id, text}};
    iState = reducer(iState, action);

    expect(iState.get('text')).toBe('');
    const iTodos = iState.get('todos');
    expect(iTodos.size).toBe(1);
    const iTodo = iTodos.get('1');
    expect(iTodo.get('_id')).toBe(_id);
    expect(iTodo.get('text')).toBe(text);
  });

  it('should process archive action', () => {
    let iState = Immutable.fromJS({
      text: 'foo',
      todos: {
        1: {_id: '1', text: 'Get milk', done: true},
        2: {_id: '2', text: 'Take out trash', done: false}
      }
    });
    const action = {type: 'archiveCompleted'};
    iState = reducer(iState, action);

    expect(iState.get('text')).toBe('foo'); // doesn't change
    const iTodos = iState.get('todos');
    // The "Get milk" todo should be removed.
    expect(iTodos.size).toBe(1);
    // The "Take out trash" todo should still be there.
    const iTodo = iTodos.get('2'); // keys are strings
    expect(iTodo.get('_id')).toBe('2');
    expect(iTodo.get('text')).toBe('Take out trash');
  });

  it('should process delete action', () => {
    let iState = Immutable.fromJS({
      text: 'foo',
      todos: {
        1: {_id: '1', text: 'Get milk', done: true},
        2: {_id: '2', text: 'Take out trash', done: false}
      }
    });
    const action = {type: 'deleteTodo', payload: {_id: '1'}};
    iState = reducer(iState, action);

    expect(iState.get('text')).toBe('foo'); // doesn't change
    const iTodos = iState.get('todos');
    // The "Get milk" todo should be removed.
    expect(iTodos.size).toBe(1);
    // The "Take out trash" todo should still be there.
    const iTodo = iTodos.get('2'); // keys are strings
    expect(iTodo.get('_id')).toBe('2');
    expect(iTodo.get('text')).toBe('Take out trash');
  });

  it('should process error action', () => {
    let iState;
    const msg = 'Something went wrong';
    const action = {type: 'error', payload: msg};
    iState = reducer(iState, action);

    expect(iState.get('error')).toBe(msg);
  });

  it('should process setTodos action', () => {
    const todos = [
      {_id: '1', text: 'Get milk', done: true},
      {_id: '2', text: 'Take out trash', done: false}
    ];
    const action = {type: 'setTodos', payload: todos};
    const iState = reducer(undefined, action);

    const iTodos = iState.get('todos');
    expect(iTodos.size).toBe(2);
    let key = '1'; // keys are strings
    let iTodo = iTodos.get(key);
    expect(iTodo.get('_id')).toBe(todos[0]._id);
    expect(iTodo.get('text')).toBe(todos[0].text);
    key = '2'; // keys are strings
    iTodo = iTodos.get(key);
    expect(iTodo.get('_id')).toBe(todos[1]._id);
    expect(iTodo.get('text')).toBe(todos[1].text);
  });

  it('should process textChange action', () => {
    const oldText = 'foo';
    let iState = Immutable.fromJS({text: oldText});
    const newText = oldText + 'X';
    const action = {type: 'textChange', payload: {text: newText}};
    iState = reducer(iState, action);

    expect(iState.get('text')).toBe(newText);
  });

  it('should process toggleDone action', () => {
    let iState = Immutable.fromJS({
      text: 'foo',
      todos: {
        1: {_id: '1', text: 'Get milk', done: true},
        2: {_id: '2', text: 'Take out trash', done: false}
      }
    });
    // Toggle done flag for "Take out trash" to true.
    const action = {type: 'toggleDone', payload: {_id: '2'}};
    iState = reducer(iState, action);

    expect(iState.get('text')).toBe('foo'); // doesn't change
    const iTodos = iState.get('todos');
    // The number of todos should not have changed.
    expect(iTodos.size).toBe(2);
    const iTodo = iTodos.get('2'); // keys are strings
    expect(iTodo.get('done')).toBe(true);
  });
});
