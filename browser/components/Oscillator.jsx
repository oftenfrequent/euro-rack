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
      min: 0,
      max: 1000,
      value: 0,
      degreesTotal: 180,
      active: false,
      type: "sine",
      optionTypes: ['sine', 'square', 'triangle', 'sawtooth'],
      osc: this.props.osc
    }
  }

  onInputActive() {
    this.setState({active: !this.state.active})
  }

  onChangeType(type) {
    this.setState({type}, () => {this.state.osc.type = type})
  }

  onChangeValue(value) {
    this.setState({ active: false, value }, () => {
      this.state.osc.frequency.value = value
    })
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
          min={this.state.min}
          max={this.state.max}
          value={this.state.value.toString()}
          changeValue={(v) => this.onChangeValue(v)}
          active={this.state.active}
          makeActive={() => this.onInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.state.min}
          max={this.state.max}
          value={this.state.value}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(v) => this.onChangeValue(v)}
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