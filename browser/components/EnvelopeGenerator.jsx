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
      degreesTotal: 180,
      attack: 0,
      decay: 0,
      sustain: 0,
      release: 0,
      optionAttackTypes: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step'],
      env: this.props.env
    }
  }

  onChangeType(type) {
    this.setState({type}, () => {this.state.env.attackCurve = type})
  }

  onValueChange(value, type) {
    this.setState({ [type]:value }, () => {
      this.state.env[type] = value / 1000
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
          name='attack'
          min={this.state.min}
          max={this.state.max}
          value={this.state.attack}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(p) => this.onValueChange(p, 'attack')}
        />
        <Knob
          name='decay'
          min={this.state.min}
          max={this.state.max}
          value={this.state.decay}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(p) => this.onValueChange(p, 'decay')}
        />
        <Knob
          name='sustain'
          min={this.state.min}
          max={this.state.max}
          value={this.state.sustain}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(p) => this.onValueChange(p, 'sustain')}
        />
        <Knob
          name='release'
          min={this.state.min}
          max={this.state.max}
          value={this.state.release}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(p) => this.onValueChange(p, 'release')}
        />
        <button onClick={() => this.props.onConnect()}>connect to osc</button>
        <button onClick={() => this.props.triggerHit()}>triggerAttackRelease</button>
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
