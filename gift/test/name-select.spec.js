/* global describe, it */
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import NameSelect from '../src/name-select.js';

describe('NameSelect', () => {
  it('should have expected content', () => {
    const names = ['Moe', 'Larry', 'Curly'];
    const selectedName = 'Larry';
    function onDelete() {}
    function onSelect() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a NameSelect component.
    renderer.render(
      <NameSelect names={names}
        selectedName={selectedName}
        onSelect={onSelect}
        onDelete={onDelete}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('div');
    const children = output.props.children;
    expect(children.length).toEqual(3);
    const [label, select, button] = children;

    expect(label.type).toBe('label');
    expect(label.props.children).toBe('Selected Name');

    expect(select.type).toBe('select');
    expect(select.props.value).toBe(selectedName);
    const selectChildren = select.props.children;
    expect(selectChildren.length).toEqual(3);
    selectChildren.forEach((option, index) => {
      expect(option.type).toBe('option');
      expect(option.key).toBe(names[index]);
      expect(option.props.children).toBe(names[index]);
    });

    expect(button.type).toBe('button');
    expect(button.props.onClick).toBe(onDelete);
    const buttonText = button.props.children;
    const unicodePlusHex = 0x2796;
    expect(buttonText.charCodeAt(0)).toBe(unicodePlusHex);
  });
});
