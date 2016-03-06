/* global describe, it */
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import TextEntry from '../src/text-entry.js';

describe('Textentry', () => {
  it('should have expected content', () => {
    function onAdd() {}
    function onChange() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a Todo element.
    renderer.render(
      <TextEntry id="my-label"
        label="My Label"
        value="my value"
        onAdd={onAdd}
        onChange={onChange}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('div');

    const children = output.props.children;
    //console.log('text-entry.spec.js it: children =', children);
    expect(children.length).toEqual(3);

    const [label, input, button] = children;

    expect(label.type).toEqual('label');
    expect(label.props.children).toEqual('My Label');

    expect(input.props.id).toEqual('my-label');
    expect(input.props.type).toEqual('text');
    expect(input.props.value).toEqual('my value');
    expect(input.props.onChange).toEqual(onChange);

    expect(button.type).toEqual('button');
    expect(button.props.onClick).toEqual(onAdd);
  });
});
