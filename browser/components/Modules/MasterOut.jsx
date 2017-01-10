import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import { connectJack } from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

export class MasterOut extends React.Component {
  constructor(props){
    super(props)
    // this.state = {
    //   min: 0,
    //   max: 1000,
    //   value: 0,
    //   degreesTotal: 270,
    //   active: false,
    //   type: "sine",
    //   optionTypes: ['sine', 'square', 'triangle', 'sawtooth'],
    //   osc: this.props.osc
    // }
  }

  selectJack() {
    this.props.connectJack('master')
  }

  render(){
    return (
      <ModuleContainer name='Master Out'>
        <div className='master-out-jack'>
          <Jack name='in' onJackClick={() => this.selectJack()} />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack
  }
)(MasterOut)