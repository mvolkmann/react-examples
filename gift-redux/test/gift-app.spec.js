/* global describe, it */
import React from 'react'; //eslint-disable-line
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Immutable from 'immutable';
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

    // Setup mock environment for component.
    const handlers = {
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
    const state = Immutable.Map({
      gift: '',
      gifts: Immutable.Map(),
      name: '',
      names: Immutable.List()
    });
    const store = {
      getState() {
        return state;
      }
    };

    // Render a GiftApp component.
    renderer.render(<GiftApp handlers={handlers} store={store}/>);
    const output = renderer.getRenderOutput();

    // Test the rendered output.

    expect(output.type).toEqual('div');
    const children = output.props.children;
    expect(children.length).toBe(6);

    const [
      modal, header, nameInput, nameSelect,
      giftInput, giftList
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
    expect(okBtn.props.onClick).toBe(handlers.onDeleteName);

    expect(header.type).toBe('h2');
    expect(header.props.children).toBe('Gift App');

    expect(nameInput.type).toBe(TextEntry);
    expect(nameInput.props.label).toBe('New Name');
    expect(nameInput.props.onAdd).toBe(handlers.onAddName);
    expect(nameInput.props.onChange).toBe(handlers.onChangeName);

    expect(nameSelect.type).toBe(NameSelect);
    expect(nameSelect.props.onDelete).toBe(handlers.onConfirmDeleteName);
    expect(nameSelect.props.onSelect).toBe(handlers.onSelectName);

    expect(giftInput.type).toBe(TextEntry);
    expect(giftInput.props.label).toBe('New Gift');
    expect(giftInput.props.onAdd).toBe(handlers.onAddGift);
    expect(giftInput.props.onChange).toBe(handlers.onChangeGift);

    expect(giftList.type).toBe(GiftList);
    expect(giftList.props.onDelete).toBe(handlers.onDeleteGift);
    expect(giftList.props.onSelect).toBe(handlers.onSelectGift);
  });
});
