import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import { connectJack } from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

export class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      min: 0,
      max: 8000,
      degreesTotal: 270,
      frequency: 0,
      typeOptions: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
      type: 'lowpass',
      active: false,
      rolloffOptions: [-12, -24, -48, -96],
      rolloff: -12,
      filter: this.props.filter
    }
  }

  onInputActive() {
    this.setState({active: !this.state.active})
  }

  onChangeType(type) {
    this.setState({type}, () => {this.state.filter.type = type})
  }

  onChangeType(type) {
    this.setState({type}, () => {this.state.filter.type = type})
  }

  selectJack() {
    this.props.connectJack(this.state.filter)
  }

  onValueChange(value) {
    this.setState({ frequency: value }, () => {
      console.log('value', value)
      console.log('this.state.filter', this.state.filter)
      console.log('this.state.filter.frequency', this.state.filter.frequency)
      this.state.filter.frequency.value = value
    })
  }

  render(){
    const style = {transform: `rotate(${this.state.degreesValue}deg)`}
    return (
      <ModuleContainer name='Filter'>
        <DisplayTypeDropdown
          optionTypes={this.state.typeOptions}
          changeType={(v) => this.onChangeType(v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.state.rolloffOptions}
          changeType={(v) => this.onChangeRolloff(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.state.min}
          max={this.state.max}
          value={this.state.frequency.toString()}
          changeValue={(v) => this.onValueChange(v)}
          active={this.state.active}
          makeActive={() => this.onInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.state.min}
          max={this.state.max}
          value={this.state.frequency}
          degreesTotal={this.state.degreesTotal}
          sensitivity={100}
          onNewValue={(v) => this.onValueChange(v)}
        />
        <div className='filter-in-jack'>
          <Jack name='in' onJackClick={() => this.selectJack()} />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out' onJackClick={() => this.selectJack()} />
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
)(Filter)
