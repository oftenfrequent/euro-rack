import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'

import Knob from '../../components/ModuleComponents/Knob'
import KnobComponent from '../../components/ModuleComponents/KnobComponent'

describe('Knob', () => {
  let props

  beforeEach(() => {
    props = {
      name: undefined,
      min: undefined,
      max: undefined,
      value: undefined,
      degreesTotal: undefined,
      sensitivity: undefined,
      onNewValue: () => true,
    }
  })

  it('renders KnobComponent', () => {
    const wrapper = mount(<Knob {...props} />)
    // console.log('comp', wrapper.find(KnobComponent))
    expect(wrapper).to.contain(<KnobComponent/>)
  })

})
