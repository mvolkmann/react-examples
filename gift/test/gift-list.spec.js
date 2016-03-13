/* global describe, it */
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import GiftList from '../src/gift-list.js';

describe('GiftList', () => {
  it('should have expected content', () => {
    const gifts = ['CD', 'headphones', 'iPad']
    const selectedGift = 'headphones';
    function onDelete() {}
    function onSelect() {}

    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a GiftList component.
    renderer.render(
      <GiftList gifts={gifts}
        selectedGift={selectedGift}
        onDelete={onDelete}
        onSelect={onSelect}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('div');
    const children = output.props.children;
    expect(children.length).toBe(2);

    const [select, button] = children;

    expect(select.type).toBe('select');
    //TODO: Assert that the value of the select is selectedGift.
    const selectChildren = select.props.children;
    expect(selectChildren.length).toEqual(3);
    selectChildren.forEach((option, index) => {
      //TODO: Assert that the type of the option is "option".
      //TODO: Assert that the key of the option is the gift at index.
      //TODO: Assert that the text value of the option is the gift at index.
    });

    expect(button.type).toBe('button');
    //TODO: Assert that the button onClick handler is the onDelete function.
    const buttonText = button.props.children;
    const unicodePlusHex = 0x2796;
    expect(buttonText.charCodeAt(0)).toBe(unicodePlusHex);
  });
});
