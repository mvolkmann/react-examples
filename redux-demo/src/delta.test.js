// @flow

import React from 'react';
import Delta from './delta';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

/**
 * These tests just verify that when the user
 * interacts with the UI in a certain way,
 * the expected Redux actions are dispatched.
 */
describe('Delta', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    const initialState = {delta: 1};
    store = mockStore(initialState);
  });

  test('should match snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Delta />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should dispatch', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Delta />
      </Provider>
    );
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 2}});

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'deltaChange',
      payload: 2
    });
  });
});
