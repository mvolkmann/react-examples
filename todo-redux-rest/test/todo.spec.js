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

    expect(output.type).toEqual('li');

    const children = output.props.children;
    expect(children.length).toEqual(3);

    const [input, span, button] = children;

    expect(input.type).toEqual('input');
    expect(input.props.type).toEqual('checkbox');
    expect(input.props.checked).toEqual(true);

    expect(span.type).toEqual('span');
    expect(span.props.className).toEqual('done-true');
    expect(span.props.children).toEqual('Get milk');

    expect(button.type).toEqual('button');
    expect(button.props.children).toEqual('Delete');

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
