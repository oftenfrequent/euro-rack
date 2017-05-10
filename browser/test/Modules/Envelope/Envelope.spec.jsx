import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
// import { renderIntoDocument } from 'react-addons-test-utils'

import { Envelope } from '../../../components/Modules/Envelope/Envelope'

describe('Envelope', () => {
  let props


  beforeEach(() => {
    props = {
      id: undefined,
      key: undefined,
      order: undefined,
      changeOrder: undefined,
      onJackClick: () => true,
    }
  });

  it('renders three <Foo /> components', () => {
    console.log('PROPS - ', props)
    const wrapper = shallow(<Envelope {...props} />)
    expect(true).to.be.false
    // const wrapper = shallow(<MyComponent />);
    // expect(wrapper.find(Foo)).to.have.length(3);
  });
})
