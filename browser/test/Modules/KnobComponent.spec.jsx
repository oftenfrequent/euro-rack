import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import KnobComponent from '../../components/ModuleComponents/KnobComponent'

describe('KnobComponent', () => {
  let props

  beforeEach(() => {
    props = {
      name: undefined,
      degreesValue: undefined,
      degreesTotal: undefined,
      sensitivity: undefined,
      onChange: () => true,
    }
  })

  it('renders KnobComponent with no name', () => {
    const wrapper = shallow(<KnobComponent {...props} />)
    const name = wrapper.find('h5')
    expect(name.length).to.equal(0)
  })

  it('renders KnobComponent with a name', () => {
    props['name'] = 'Cool'
    const wrapper = shallow(<KnobComponent {...props} />)
    const name = wrapper.find('h5').text()
    expect(name).to.equal('Cool')
  })

  // TODO: testing click and drag on element
  // it('renders KnobComponent with a name', () => {
  //   props['name'] = 'Cool'
  //   // const wrapper = shallow(<Button />); wrapper.instance().handleClick()
  //   const wrapper = shallow(<KnobComponent {...props} />)
  //   const knob = wrapper.find('.knob').simulate('click')
  //   console.log('WRAPPER', wrapper.instance())
  //   expect(true).to.be.true
  // })

})
