/* global describe, it */
import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Todo from '../public/todo.js';

// Setup JSDOM which is needed by TestUtils.renderIntoDocument.
import jsdom from 'jsdom';
global.document = jsdom.jsdom();
global.window = global.document.defaultView;

describe('Todo', () => {
  it('should have expected content', () => {
    // Define prop values needed to render a Todo component.
    const iTodo = Immutable.fromJS({text: 'Get milk', done: true});

    let deletedTodo = false;
    function onDeleteTodo() {
      deletedTodo = true;
    }
    function onToggleDone() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a Todo element.
    renderer.render(
      <Todo iTodo={iTodo}
        onDeleteTodo={onDeleteTodo}
        onToggleDone={onToggleDone}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toBe('li');

    const children = output.props.children;
    expect(children.length).toBe(3);

    const [input, span, button] = children;

    expect(input.type).toBe('input');
    expect(input.props.type).toBe('checkbox');
    expect(input.props.checked).toBe(true);
    expect(input.props.onChange).toBe(onToggleDone);

    expect(span.type).toBe('span');
    expect(span.props.className).toBe('done-true');
    expect(span.props.children).toBe('Get milk');

    expect(button.type).toBe('button');
    expect(button.props.children).toBe('Delete');
    expect(button.props.onClick).toBe(onDeleteTodo);

    // Test use of Delete button.
    const todo = TestUtils.renderIntoDocument(
      <Todo iTodo={iTodo}
        onDeleteTodo={onDeleteTodo}
        onToggleDone={onToggleDone}/>);
    const deleteBtn = TestUtils.findRenderedDOMComponentWithTag(todo, 'button');
    expect(deletedTodo).toBe(false);
    TestUtils.Simulate.click(deleteBtn);
    expect(deletedTodo).toBe(true);
  });
});
