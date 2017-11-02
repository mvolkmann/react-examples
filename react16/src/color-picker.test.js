// @flow

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import ColorPicker from './color-picker';
import {initialState} from './reducer';

import './setup-tests';

describe('ColorPicker', () => {
  test('should handle color selection', () => {
    const mockStore = configureStore([]);
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ColorPicker />
      </Provider>
    );

    const newColor = 'blue';
    const select = wrapper.find('select');
    select.simulate('change', {target: {value: newColor}});
    const [action] = store.getActions();
    expect(action.type).toBe('setColor');
    expect(action.payload).toBe(newColor);
  });
});
