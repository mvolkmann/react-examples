/* global describe, it */
import Immutable from 'immutable';
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TodoHeader from '../public/todo-header.js';

expect.extend(expectJSX);

describe('TodoHeader', () => {
  it('should have expected content', () => {
    // Define prop values needed to render a TodoHeader component.
    const iTodos = Immutable.fromJS({
      1: {_id: 1, text: 'Get milk', done: true},
      2: {_id: 2, text: 'Take out trash', done: false}
    });
    function onArchiveCompleted() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a TodoHeader component.
    renderer.render(
      <TodoHeader iTodos={iTodos}
        onArchiveCompleted={onArchiveCompleted}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output).toIncludeJSX(
      <h2>To Do List</h2>);
    expect(output).toIncludeJSX(
      <span>1 of 2 remaining</span>);
    expect(output).toIncludeJSX(
      <button onClick={onArchiveCompleted}>
        Archive Completed
      </button>);

    expect(output).toEqualJSX(
      <div>
        <h2>To Do List</h2>
        <div>
          <span>1 of 2 remaining</span>
          <button onClick={onArchiveCompleted}>
            Archive Completed
          </button>
        </div>
      </div>
    );

    expect(output.type).toBe('div');
    const children = output.props.children;
    expect(children.length).toBe(2);

    const [header, div] = children;

    expect(header.type).toBe('h2');
    expect(header.props.children).toBe('To Do List');

    expect(div.type).toBe('div');
    const divChildren = div.props.children;
    expect(divChildren.length).toBe(2);

    const [span, button] = divChildren;

    const spanChildren = span.props.children;
    expect(spanChildren[0]).toBe(1);
    expect(spanChildren[1]).toBe(' of ');
    expect(spanChildren[2]).toBe(2);
    expect(spanChildren[3]).toBe(' remaining');

    expect(button.type).toBe('button');
    expect(button.props.children).toBe('Archive Completed');
    expect(button.props.onClick).toBe(onArchiveCompleted);
  });
});
