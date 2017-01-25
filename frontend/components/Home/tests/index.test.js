import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from '../';

describe('<Home />', () => {
  it('should render "Hello World!"', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.text()).contains('Hello world!');
  });
});