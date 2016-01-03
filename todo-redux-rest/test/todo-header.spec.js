/* global describe, it */
import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import TodoHeader from '../public/todo-header.js';

describe('TodoHeader', () => {
  it('should have expected content', () => {
    // Define prop values needed to render a Todo element.
    const iTodos = Immutable.fromJS([
      {_id: 1, text: 'Get milk', done: true},
      {_id: 2, text: 'Take out trash', done: false}
    ]);
    function onArchiveCompleted() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a Todo element.
    renderer.render(
      <TodoHeader iTodos={iTodos}
        onArchiveCompleted={onArchiveCompleted}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('div');
    const children = output.props.children;
    expect(children[0].type).toBe('h2');
    expect(children[0].props.children).toBe('To Do List');
    expect(children[1]).toBe(1);
    expect(children[2]).toBe(' of ');
    expect(children[3]).toBe(2);
    expect(children[4]).toBe(' remaining');
    expect(children[5].type).toBe('button');
  });
});
