// @flow

import type {ActionType, StateType} from './types';

const initialState = {
  color: 'green'
};

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case 'setColor':
      return {...state, color: action.payload};
    default:
      return state;
  }
}

export default reducer;
