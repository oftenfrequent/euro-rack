import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'


import ModuleContainer from './ModuleComponents/ModuleContainer'
import DisplayAmount from './ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from './ModuleComponents/DisplayTypeDropdown'
import Knob from './ModuleComponents/Knob'

export class Oscillator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      frequency: {
        value: 0,
        min: 0,
        max: 8000
      },
      active: false,
      type: "sine",
      optionTypes: ['sine', 'square', 'triangle', 'sawtooth'],
      degreesValue: 0,
      osc: this.props.osc //new Tone.Oscillator(0, "sine").start()
    }
  }

  generateNewFrequency(percentChange) {
    const newFrequency = parseInt(this.state.frequency.value) + (percentChange/100 * this.state.frequency.max)
    return newFrequency <= this.state.frequency.min ? this.state.frequency.min
      : newFrequency >= this.state.frequency.max ? this.state.frequency.max
      : newFrequency
  }

  generateNewDegrees(percentChange) {
    const newDegrees = this.state.degreesValue + (percentChange/100 * 180)
    return newDegrees <= 0 ? 0 : newDegrees >= 180 ? 180 : newDegrees
  }

  generateNewDegreesFromValueChange(newValue) {
    return ((newValue - this.state.frequency.value)/(this.state.frequency.max - this.state.frequency.min))*100
  }

  onChangeValue(value) {
    this.setState({
      active: false,
      frequency: {
        value: value,
        min: this.state.frequency.min,
        max: this.state.frequency.max
      },
      degreesValue: this.generateNewDegrees(this.generateNewDegreesFromValueChange(value))
    }, () => {
      this.state.osc.frequency.value = value
    })
  }

  onInputActive() {
    this.setState({active: !this.state.active})
  }

  onChangeType(type) {
    this.setState({type}, () => {this.state.osc.type = type})
  }

  onKnobTwist(percentChange) {
    const newFrequency = this.generateNewFrequency(percentChange)
    this.setState({
      degreesValue: this.generateNewDegrees(percentChange),
      frequency: {
        value: this.generateNewFrequency(percentChange),
        min: this.state.frequency.min,
        max: this.state.frequency.max
      }}, () => {
      console.log(this.state.frequency)
      this.state.osc.frequency.value = newFrequency })
  }

  render(){
    const style = {transform: `rotate(${this.state.degreesValue}deg)`}

    return (
      <ModuleContainer name='VCO'>
        <DisplayTypeDropdown
          optionTypes={this.state.optionTypes}
          changeType={(v) => this.onChangeType(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.state.frequency.min}
          max={this.state.frequency.max}
          value={this.state.frequency.value.toString()}
          changeValue={(v) => this.onChangeValue(v)}
          active={this.state.active}
          makeActive={() => this.onInputActive()}
        />
        <Knob
          degreesValue={this.state.degreesValue}
          sensitivity={100}
          onChange={(p) => this.onKnobTwist(p)}
          name='Frequency'
        />
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
)(Oscillator)
