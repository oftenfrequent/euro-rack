import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import { connectJack } from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

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

  selectJack() {
    this.props.connectJack(this.state.env)
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
          onNewValue={(v) => this.onValueChange(v, 'attack')}
        />
        <Knob
          name='decay'
          min={this.state.min}
          max={this.state.max}
          value={this.state.decay}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(v) => this.onValueChange(v, 'decay')}
        />
        <Knob
          name='sustain'
          min={this.state.min}
          max={this.state.max}
          value={this.state.sustain}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(v) => this.onValueChange(v, 'sustain')}
        />
        <Knob
          name='release'
          min={this.state.min}
          max={this.state.max}
          value={this.state.release}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(v) => this.onValueChange(v, 'release')}
        />
        <div className='envelope-in-jack'>
          <Jack name='in' onJackClick={() => this.selectJack()}/>
        </div>
        <div className='envelope-out-jack'>
          <Jack name='out' onJackClick={() => this.selectJack()}/>
        </div>
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
  mapStateToProps,
  {
    connectJack
  }
)(EnvelopeGenerator)
