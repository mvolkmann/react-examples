// @flow

export type ActionType = {
  type: string,
  payload?: mixed
};

export type DispatchType = (action: ActionType) => void;

export type StateType = {
  counter: number,
  delta: number
};

export type SubstateType = {
  counter?: number,
  delta?: number
};
