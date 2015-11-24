/* global describe, expect, it, jest */
jest.dontMock('../src/greeting');

import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import TestUtils from 'react.addons-test-utils';

const Greeting = require('../src/greeting');

describe('greeting', () => {
  it('greets', () => {
    const dom = TestUtils.renderIntoDocument(
      <Greeting/>
    );
    const node = ReactDOM.findDOMNode(dom);
    expect(node.textContent).toEqual('wrong');
  });
});
