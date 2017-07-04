// @flow

import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Counter from './counter';
import './types';

/**
 * These tests just verify that when the user
 * interacts with the UI in in a certain way,
 * the expected Redux actions are dispatched.
 */
describe('Counter', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    const initialState = {counter: 0, delta: 1};
    store = mockStore(initialState);
  });

  it('should decrement', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
    const btn = wrapper.find('.dec-btn');
    btn.simulate('click');

    const actions = store.getActions();
    expect(actions[0]).toEqual({type: 'decrement'});
  });

  it('should increment', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
    const btn = wrapper.find('.inc-btn');
    btn.simulate('click');

    const actions = store.getActions();
    expect(actions[0]).toEqual({type: 'increment'});
  });
});
