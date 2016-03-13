import Immutable from 'immutable';
import {addToSortedList, deleteFromList} from './immutable-utils';

function selectedNameHasGifts(state) {
  const gifts = state.get('gifts');
  const selectedName = state.get('selectedName');
  const giftsForName = gifts.get(selectedName);
  return giftsForName && giftsForName.size;
}

const reducers = {
  addName(state) {
    const name = state.get('name');
    const names = state.get('names');
    return names.includes(name) ? state :
      state.withMutations(s =>
        s.set('focusId', 'giftInput').
          set('name', '').
          set('names', addToSortedList(names, name)).
          set('selectedName', name).
          setIn(['gifts', name], Immutable.List()));
  },
  changeName(state, payload) {
    return state.withMutations(s =>
      s.set('focusId', 'nameInput').
        set('name', payload));
  },
  closeConfirmDeleteModal(state) {
    return state.set('confirmDelete', false);
  },
  confirmDeleteName(state) {
    return selectedNameHasGifts(state) ?
      state.set('confirmDelete', true) :
      reducers.deleteSelectedName(state);
  },
  deleteSelectedName(state) {
    return reducers.deleteName(state, state.get('selectedName'));
  },
  deleteName(state, name) {
    const names = state.get('names');
    const gifts = state.get('gifts');
    const newNames = deleteFromList(names, name);
    return state.withMutations(s =>
      s.set('confirmDelete', false).
        set('names', newNames).
        // Remove the gifts for the selected name.
        set('gifts', gifts.delete(name)).
        set('selectedName', newNames.first()));
  },
  selectName(state, payload) {
    return state.withMutations(s =>
      s.set('focusId', 'giftInput').
        set('selectedName', payload));
  }
};

export default reducers;
