/* global describe, it */
import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Todo from '../public/todo.js';
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
    // Render a TodoList component.
    renderer.render(
      <TodoList iTodos={iTodos}
        onDeleteTodo={onDeleteTodo}
        onToggleDone={onToggleDone}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toBe('ul');

    const children = output.props.children;
    expect(children.size).toBe(2);

    let todo = children.first();
    expect(todo.type).toBe(Todo);
    let iTodo = todo.props.iTodo;
    expect(iTodo.get('text')).toBe('Get milk');
    expect(iTodo.get('done')).toBe(true);

    todo = children.last();
    expect(todo.type).toBe(Todo);
    iTodo = todo.props.iTodo;
    expect(iTodo.get('text')).toBe('Take out trash');
    expect(iTodo.get('done')).toBe(false);
  });
});
