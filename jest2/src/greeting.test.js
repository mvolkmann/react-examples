import Greeting from './greeting';
import {mount} from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Greeting', () => {

  it('should match snapshot', () => {
    const tree = renderer.create(<Greeting />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handle text change', () => {
    const name = 'Mark';

    const wrapper = mount(<Greeting />);
    const input = wrapper.find('input');
    const div = wrapper.find('.message');

    input.simulate('change', {target: {value: name}});

    expect(div.text()).toBe(`Hello, ${name}!`);
  });
});
