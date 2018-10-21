import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'
import {fromJS} from 'immutable'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import { addOscillator } from '../Oscillator/OscillatorActions'
import { addLFO } from '../LFO/LFOActions'
import { addEnvelope } from '../Envelope/EnvelopeActions'
import { addFilter } from '../Filter/FilterActions'
import { addConvolutionReverb } from '../ConvolutionReverb/ConvolutionReverbActions'
import { addVCA } from '../VCA/VCAActions'
import { addPingPong } from '../PingPong/PingPongActions'

export class AddNewComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedModule: 'vco'
    }
  }

  changeStateModule(v) { this.setState({selectedModule: v}) }

  addModule() {
    switch(this.state.selectedModule) {
      case 'vco' :
        return this.props.addOscillator()
      case 'lfo' :
        return this.props.addLFO()
      case 'envelope' :
        return this.props.addEnvelope()
      case 'filter' :
        return this.props.addFilter()
      case 'convolutionReverb' :
        return this.props.addConvolutionReverb()
      case 'vca' :
        return this.props.addVCA()
      case 'pingPong' :
        return this.props.addPingPong()
    }

  }

  render(){
    return (
        <ModuleContainer
          name=''
          containerClass='addModule'
          draggable={false}
        >
          <DisplayTypeDropdown
            optionTypes={fromJS(['vco', 'lfo', 'envelope', 'filter', 'vca', 'convolutionReverb', 'pingPong'])}
            changeType={(v) => this.changeStateModule(v)}
          />
          <button onClick={() => this.addModule()}>Add Module</button>
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
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA,
    addConvolutionReverb,
    addPingPong,
  }
)(AddNewComponent)
