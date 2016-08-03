import Immutable from 'immutable';
import giftReducers from './gift-reducers';
import nameReducers from './name-reducers';

const reducers = Object.assign({}, giftReducers, nameReducers);

const initialState = Immutable.Map({
  gift: '',
  gifts: Immutable.Map(),
  name: '',
  names: Immutable.List()
});

export default function (state = initialState, action) {
  // If no state is provided, return the initial state.
  // This is useful in tests.
  // Redux dispatches the "@@redux/INIT" action when the store is created.
  // Just return the initial state.
  if (!action || action.type === '@@redux/INIT') return initialState;

  const reducer = reducers[action.type];
  if (!reducer) {
    throw new Error('no reducer named "' + action.type + '" was found');
  }

  return reducer(state, action.payload);
}
