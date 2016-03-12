import Immutable from 'immutable';

/**
 * Adds an item to a list so the elements remain in sorted order.
 */
function addToSortedList(list, item) {
  // Find index where item should be inserted.
  const index = list.findIndex(element => element > item);
  // Return new List with item inserted before that index,
  // or at the end if no element greater than item was found.
  return index === -1 ? list.push(item) : list.insert(index, item);
}

/**
 * Deletes an item from a list.
 */
function deleteFromList(list, item) {
  return list.delete(list.findIndex(element => element === item));
}

function selectedNameHasGifts(state) {
  const gifts = state.get('gifts');
  const selectedName = state.get('selectedName');
  const giftsForName = gifts.get(selectedName);
  return giftsForName && giftsForName.size;
}

const reducers = {
  addGift(state) {
    const gift = state.get('gift');
    const gifts = state.get('gifts');
    const selectedName = state.get('selectedName');
    const giftsForName = gifts.get(selectedName);
    return giftsForName.includes(gift) ? state :
      state.withMutations(s =>
        s.set('gift', '').
          setIn(['gifts', selectedName], addToSortedList(giftsForName, gift)));
  },
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
  changeGift(state, payload) {
    return state.withMutations(s =>
      s.set('focusId', 'giftInput').
        set('gift', payload));
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
      reducers.deleteName(state);
  },
  deleteGift(state) {
    const selectedName = state.get('selectedName');
    const gifts = state.get('gifts');
    const selectedGift = state.get('selectedGift');
    const giftsForName =
      deleteFromList(gifts.get(selectedName), selectedGift);
    return state.withMutations(s =>
      s.set('selectedGift', giftsForName.first()).
        set('gifts', gifts.set(selectedName, giftsForName)));
  },
  deleteName(state) {
    const names = state.get('names');
    const gifts = state.get('gifts');
    const selectedName = state.get('selectedName');
    const newNames = deleteFromList(names, selectedName);
    return state.withMutations(s =>
      s.set('confirmDelete', false).
        set('names', newNames).
        // Remove the gifts for the selected name.
        set('gifts', gifts.delete(selectedName)).
        set('selectedName', newNames.first()));
  },
  selectGift(state, payload) {
    return state.set('selectedGift', payload);
  },
  selectName(state, payload) {
    return state.withMutations(s =>
      s.set('focusId', 'giftInput').
        set('selectedName', payload));
  }
};

const initialState = Immutable.Map({
  gift: '',
  gifts: Immutable.Map(),
  name: '',
  names: Immutable.List()
});

function rootReducer(state = initialState, action) {
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

export default rootReducer;
