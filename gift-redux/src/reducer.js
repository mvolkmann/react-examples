import Immutable from 'immutable';

function addToSortedList(list, item) {
  // Find index where item should be inserted.
  const index = list.findIndex(element => element > item);
  // Return new List with item inserted before that index,
  // or at the end if no element greater than item was found.
  return index === -1 ? list.push(item) : list.insert(index, item);
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
    const giftsForName = gifts.get(selectedName).delete(selectedGift);
    return state.withMutations(s =>
      s.set('selectedGift', giftsForName.first()).
        set('gifts', gifts.set(selectedName, giftsForName)));
  },
  deleteName(state) {
    const names = state.get('names');
    const gifts = state.get('gifts');
    const selectedName = state.get('selectedName');
    const newNames = names.delete(selectedName);
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
  const reducer = reducers[action.type];
  const payload = action ? action.payload : null;
  return reducer ? reducer(state, payload) : state;
}

export default rootReducer;
