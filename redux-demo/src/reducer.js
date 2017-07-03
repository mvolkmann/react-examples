// @flow
import type {ActionType, StateType, SubstateType} from './types';

const initialState: StateType = {
  counter: 0,
  delta: 1
};

// In this example, all reducer functions are in one file,
// but we could mix in functions from other files here.
const functions = {
  decrement(state: StateType): SubstateType {
    const {counter, delta} = state;
    return {counter: counter - delta};
  },
  deltaChange(state: StateType, delta: number): SubstateType {
    return {delta};
  },
  increment(state: StateType): SubstateType {
    const {counter, delta} = state;
    return {counter: counter + delta};
  }
};

function reducer(state: StateType, action: ActionType): StateType {
  const {payload, type} = action;
  if (type === '@@redux/INIT') return initialState;

  const fn = functions[type];
  if (!fn) {
    console.error(`unsupported action type "${type}"`);
  }
  const changes = fn ? fn(state, payload) : state;
  return {...state, ...changes};
}

export default reducer;
