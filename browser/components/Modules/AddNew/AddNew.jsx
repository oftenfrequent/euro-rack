import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import { addOscillator } from '../Oscillator/OscillatorActions'

export class AddNewComponent extends React.Component {
  constructor(props){
    super(props)
  }

  addModule(v) {
    switch(v) {
      case 'vco' :
        this.props.addOscillator()
    }
  }

  render(){
    return (
        <ModuleContainer name='Add New'>
          <DisplayTypeDropdown
            optionTypes={['--Types--', 'vco', 'lfo', 'envelope', 'vca']}
            changeType={(v) => this.addModule(v)}
          />
        </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
  }
}

export default connect(
  mapStateToProps,
  {
    addOscillator
  }
)(AddNewComponent)
