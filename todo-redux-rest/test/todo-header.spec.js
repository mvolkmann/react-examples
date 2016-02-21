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
    const iTodos = Immutable.fromJS([
      {_id: 1, text: 'Get milk', done: true},
      {_id: 2, text: 'Take out trash', done: false}
    ]);
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
      <div>
        1 of 2 remaining
        <button onClick={onArchiveCompleted}>
          Archive Completed
        </button>
      </div>);
    /* This fails due to newline differences.
     * Note that it differs from the previous assertion
     * in that it uses toEqualJSX instead of toIncludeJSX.
     * You reported this at https://github.com/algolia/expect-jsx/issues/14.
    expect(output).toEqualJSX(
      <div>
        <h2>To Do List</h2>
        <div>1 of 2 remaining</div>
        <button onClick={onArchiveCompleted}>
          Archive Completed
        </button>
      </div>
    );
    */

    expect(output.type).toEqual('div');

    const children = output.props.children;
    expect(children[0].type).toBe('h2');
    expect(children[0].props.children).toBe('To Do List');
    expect(children[1].type).toBe('div');

    const divChildren = children[1].props.children;
    expect(divChildren[0]).toBe(1);
    expect(divChildren[1]).toBe(' of ');
    expect(divChildren[2]).toBe(2);
    expect(divChildren[3]).toBe(' remaining');
    const button = divChildren[4];
    expect(button.type).toBe('button');
    expect(button.props.children).toBe('Archive Completed');
  });
});
