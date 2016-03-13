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

    // Setup mock environment for app.
    const app = {
      state: {gifts: {}, names: []},
      stateStack: [],
      onAddGift() {},
      onAddName() {},
      onChangeGift() {},
      onChangeName() {},
      onCloseModal() {},
      onConfirmDeleteName() {},
      onDeleteGift() {},
      onDeleteName() {},
      onSelectGift() {},
      onSelectName() {},
      onUndo() {}
    };

    // Render a GiftApp component.
    renderer.render(<GiftApp app={app}/>);
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
    const modalChildren = modal.props.children;
    expect(modalChildren.length).toBe(3);
    const modalFooter = modalChildren[2];
    const modalFooterChildren = modalFooter.props.children;
    expect(modalFooterChildren.length).toBe(2);
    const okBtn = modalFooterChildren[1];
    expect(okBtn.type).toBe(Button);
    expect(okBtn.props.children).toBe('OK');
    expect(okBtn.props.onClick).toBe(app.onDeleteName);

    expect(header.type).toBe('h2');
    expect(header.props.children).toBe('Gift App');

    expect(nameInput.type).toBe(TextEntry);
    expect(nameInput.props.label).toBe('New Name');
    expect(nameInput.props.onAdd).toBe(app.onAddName);
    expect(nameInput.props.onChange).toBe(app.onChangeName);

    expect(nameSelect.type).toBe(NameSelect);
    expect(nameSelect.props.onDelete).toBe(app.onConfirmDeleteName);
    expect(nameSelect.props.onSelect).toBe(app.onSelectName);

    expect(giftInput.type).toBe(TextEntry);
    expect(giftInput.props.label).toBe('New Gift');
    expect(giftInput.props.onAdd).toBe(app.onAddGift);
    expect(giftInput.props.onChange).toBe(app.onChangeGift);

    //TODO: Assert that the type of the giftList component is GiftList.
    expect(giftList.props.onDelete).toBe(app.onDeleteGift);
    expect(giftList.props.onSelect).toBe(app.onSelectGift);

    expect(undoBtn.type).toBe(Button);
    expect(undoBtn.props.onClick).toBe(app.onUndo);
  });
});
