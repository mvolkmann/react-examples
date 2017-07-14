// @flow

import React from 'react';
import Counter from './counter';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

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

  test('should match snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Counter />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should decrement', () => {
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

  test('should increment', () => {
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
