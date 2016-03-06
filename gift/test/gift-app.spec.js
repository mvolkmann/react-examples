/* global describe, it */
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {Button, Modal} from 'react-bootstrap';
import GiftApp from '../src/gift-app.js';
import GiftList from '../src/gift-list.js';
import NameSelect from '../src/name-select.js';
import TextEntry from '../src/text-entry.js';

describe('GiftApp', () => {
  it('should have expected content', () => {
    // Create a "shallow renderer" that renders only the top-level component
    // and does not require a DOM.
    const renderer = TestUtils.createRenderer();

    // Render a TodoList element.
    renderer.render(<GiftApp/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('div');
    const children = output.props.children;
    expect(children.length).toBe(7);

    const [
      modal, header, nameInput, nameSelect,
      giftInput, giftList, undoBtn
    ] = children;

    expect(modal.type).toBe(Modal);
    expect(header.type).toBe('h2');
    expect(header.props.children).toBe('Gift App');
    expect(nameInput.type).toBe(TextEntry);
    expect(nameSelect.type).toBe(NameSelect);
    expect(giftInput.type).toBe(TextEntry);
    expect(giftList.type).toBe(GiftList);
    expect(undoBtn.type).toBe(Button);
  });
});
