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
  // Redux dispatches this action when the store is created.
  // Just return the initial state.
  if (action.type === '@@redux/INIT') return state;

  const reducer = reducers[action.type];
  if (!reducer) {
    throw new Error('no reducer named "' + action.type + '" was found');
  }
  const payload = action ? action.payload : null;
  return reducer(state, payload);
}
