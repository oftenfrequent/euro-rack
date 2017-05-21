import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { fromJS } from 'immutable'
import { Provider } from 'react-redux'
import { renderIntoDocument } from 'react-addons-test-utils'

// import EnvelopeGenerator from '../Envelope'
import {EnvelopeGenerator} from '../Envelope'
import EnvelopeInitialState from '../EnvelopeInitialState'
import ModuleContainer from '../../../ModuleComponents/ModuleContainer'

describe('Envelope', () => {
  let props


  beforeEach(() => {
    props = {
      id: '1',
      key: undefined,
      order: undefined,
      changeOrder: undefined,
      onJackClick: () => true,
      // store
      env: fromJS({
        '1': EnvelopeInitialState()
      }),
      eurorack: fromJS({
        'addModules': 'cool'
      })
    }
  })

  it('renders one <ModuleContainer /> components', () => {
    const wrapper = shallow(<EnvelopeGenerator {...props} />)
    expect(wrapper.find(ModuleContainer)).to.have.length(1)
  })
})
