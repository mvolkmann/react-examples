// @flow

export type ActionType = {
  type: string,
  payload: any
};

export type DispatchType = (action: ActionType) => void;

export type StateType = {
  color: string
};
