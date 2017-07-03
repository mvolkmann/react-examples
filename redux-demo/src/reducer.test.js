// @flow
import reducer from './reducer';
import type {StateType} from './types';

describe('reducer', () => {
  it('should decrement', () => {
    const state: StateType = {counter: 5, delta: 2};
    const action = {type: 'decrement'};
    const newState = reducer(state, action);
    expect(newState.counter).toBe(3);
  });

  it('should increment', () => {
    const state: StateType = {counter: 5, delta: 2};
    const action = {type: 'increment'};
    const newState = reducer(state, action);
    expect(newState.counter).toBe(7);
  });

  it('should change delta', () => {
    const state: StateType = {counter: 0, delta: 2};
    const action = {type: 'deltaChange', payload: 3};
    const newState = reducer(state, action);
    expect(newState.delta).toBe(3);
  });
});
