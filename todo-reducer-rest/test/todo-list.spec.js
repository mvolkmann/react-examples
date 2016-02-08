/* global describe, it */
import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import TodoList from '../public/todo-list.js';

describe('TodoList', () => {
  it('should have expected content', () => {
    // Define prop values needed to render a TodoList element.
    const iTodos = Immutable.fromJS([
      {_id: 1, text: 'Get milk', done: true},
      {_id: 2, text: 'Take out trash', done: false}
    ]);
    function onDeleteTodo() {}
    function onToggleDone() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();
    // Render a TodoList element.
    renderer.render(
      <TodoList iTodos={iTodos}
        onDeleteTodo={onDeleteTodo}
        onToggleDone={onToggleDone}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('ul');

    const children = output.props.children;
    expect(children.size).toEqual(2);

    const iTodo1 = children.first().props.iTodo;
    expect(iTodo1.get('text')).toEqual('Get milk');
    expect(iTodo1.get('done')).toEqual(true);

    const iTodo2 = children.last().props.iTodo;
    expect(iTodo2.get('text')).toEqual('Take out trash');
    expect(iTodo2.get('done')).toEqual(false);
  });
});
