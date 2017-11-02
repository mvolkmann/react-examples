// @flow

import type {ActionType, StateType} from './types';

export const initialState = {
  color: 'green'
};

export function reducer(
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
