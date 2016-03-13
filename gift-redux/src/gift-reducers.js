import {addToSortedList, deleteFromList} from './immutable-utils';

const reducers = {
  addGift(state) {
    const gift = state.get('gift');
    const gifts = state.get('gifts');
    const selectedName = state.get('selectedName');
    const giftsForName = gifts.get(selectedName);
    return giftsForName.includes(gift) ? state :
      state.withMutations(s =>
        s.set('gift', '').
          setIn(['gifts', selectedName],
            addToSortedList(giftsForName, gift)));
  },
  changeGift(state, payload) {
    return state.withMutations(s =>
      s.set('focusId', 'giftInput').
        set('gift', payload));
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
  selectGift(state, payload) {
    return state.set('selectedGift', payload);
  }
};

export default reducers;
