import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'


import ModuleContainer from './ModuleComponents/ModuleContainer'
import DisplayAmount from './ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from './ModuleComponents/DisplayTypeDropdown'
import Knob from './ModuleComponents/Knob'

export class EnvelopeGenerator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      min: 0,
      max: 1000,
      attack: {
        degreesValue: 0,
        value: 0
      },
      decay: {
        degreesValue: 0,
        value: 0
      },
      sustain: {
        degreesValue: 0,
        value: 0
      },
      release: {
        degreesValue: 0,
        value: 0
      },
      optionAttackTypes: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step'],
      env: this.props.env //new Tone.AmplitudeEnvelope(0, 0.2, 1, 0.6)
    }
  }

  generateNewValue(type, percentChange) {
    const newFrequency = parseInt(this.state[type].value) + (percentChange/100 * this.state.max)
    return newFrequency <= this.state.min ? this.state.min
      : newFrequency >= this.state.max ? this.state.max
      : newFrequency
  }

  generateNewDegrees(type, percentChange) {
    const newDegrees = this.state[type].degreesValue + (percentChange/100 * 180)
    return newDegrees <= 0 ? 0 : newDegrees >= 180 ? 180 : newDegrees
  }

  // generateNewDegreesFromValueChange(newValue) {
  //   return ((newValue - this.state.frequency.value)/(this.state.frequency.max - this.state.frequency.min))*100
  // }

  onChangeType(type) {
    this.setState({type}, () => {this.state.env.attackCurve = type})
  }

  onKnobTwist(percentChange, type) {
    const value = this.generateNewValue(type, percentChange)
    const degreesValue = this.generateNewDegrees(type, percentChange)
    this.setState({ [type]:{ degreesValue, value } }, () => {
      this.state.env[type] = value
    })
  }

  render(){
    const style = {transform: `rotate(${this.state.degreesValue}deg)`}

    return (
      <ModuleContainer name='Envelope'>
        <DisplayTypeDropdown
          optionTypes={this.state.optionAttackTypes}
          changeType={(v) => this.onChangeType(v)}
        />
        <Knob
          degreesValue={this.state.attack.degreesValue}
          sensitivity={10}
          onChange={(p) => this.onKnobTwist(p, 'attack')}
          name='Attack'
        />
        <Knob
          degreesValue={this.state.decay.degreesValue}
          sensitivity={10}
          onChange={(p) => this.onKnobTwist(p, 'decay')}
          name='Decay'
        />
        <Knob
          degreesValue={this.state.sustain.degreesValue}
          sensitivity={10}
          onChange={(p) => this.onKnobTwist(p, 'sustain')}
          name='Sustain'
        />
        <Knob
          degreesValue={this.state.release.degreesValue}
          sensitivity={10}
          onChange={(p) => this.onKnobTwist(p, 'release')}
          name='Release'
        />
        <button onClick={() => this.props.onConnect()}>connect to osc</button>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps
)(EnvelopeGenerator)
