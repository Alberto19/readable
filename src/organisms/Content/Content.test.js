import React from 'react'
import { shallow } from 'enzyme';
import Content from './Content';

describe('Content component', () => {

  test('should render', () => {
    const wrapper = shallow(<Content />)
    expect(wrapper).toBeTruthy()
  })
})
