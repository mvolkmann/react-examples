/* global describe, expect, it */

// All ES6 imports get hoisted to the top,
// so they get mocked before the line below runs!
//jest.dontMock('../src/greeting');
// This line was moved to dont-mock.js so it can be imported first.
import './dont-mock';

import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// When the commented out call to jest.dontMock above is used,
// the Greeting function gets mocked despite the "dontMock" call above!
// See explanation at https://github.com/babel/babel-jest/issues/16.
import Greeting from '../src/greeting';

describe('greeting', () => {

  it('greets with default', () => {
    const dom = TestUtils.renderIntoDocument(
      <Greeting/>
    );
    const form = ReactDOM.findDOMNode(dom);
    const lastDiv = form.lastChild;
    expect(lastDiv.textContent).toBe('Hello, World!');
  });

  it('greets with prop', () => {
    const dom = TestUtils.renderIntoDocument(
      <Greeting greet="Hola"/>
    );
    const form = ReactDOM.findDOMNode(dom);
    const lastDiv = form.lastChild;
    expect(lastDiv.textContent).toBe('Hola, World!');
  });
});
