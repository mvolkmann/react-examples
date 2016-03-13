/* global describe, it */
import expect from 'expect';
import reducer from '../src/reducer';

let state;

function dispatch(type, payload) {
  return reducer(state, {type, payload});
}

describe('reducer', () => {
  it('should manage state', () => {
    const name = 'Mark';
    const gift1 = 'iPad Pro';
    const gift2 = 'car vacuum';

    state = reducer(); // gets initial state
    state = dispatch('changeName', name);
    expect(state.get('name')).toBe(name);
    state = dispatch('addName');
    expect(state.get('selectedName')).toBe(name);

    state = dispatch('changeGift', gift1);
    expect(state.get('gift')).toBe(gift1);
    state = dispatch('addGift');

    state = dispatch('changeGift', gift2);
    expect(state.get('gift')).toBe(gift2);
    state = dispatch('addGift');

    const giftsForName = state.getIn(['gifts', name]);
    expect(giftsForName.size).toBe(2);
    expect(giftsForName.get(0)).toBe(gift2); // sorted alphabetically
    expect(giftsForName.get(1)).toBe(gift1);
  });

  // We could write many more tests like this one!
  // Each could start with a fresh state by calling reducer().
});
