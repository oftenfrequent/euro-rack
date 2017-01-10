import React from 'react'
import { connect } from 'react-redux'

import {
  connectJack,
  changeOscType,
  changeOscFreq
} from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

export class Oscillator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      active: false
    }
  }

  onInputActive() {
    this.setState({active: !this.state.active})
  }

  selectJack() {
    this.props.connectJack(this.props.vco.get('oscillator'))
  }

  render(){
    return (
      <ModuleContainer name='VCO'>
        <DisplayTypeDropdown
          optionTypes={this.props.vco.get('typeOptions')}
          changeType={(v) => this.props.changeOscType(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.props.vco.get('min')}
          max={this.props.vco.get('max')}
          value={this.props.vco.get('frequency').toString()}
          changeValue={(v) => this.props.changeOscFreq(v)}
          active={this.state.active}
          makeActive={() => this.onInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.props.vco.get('min')}
          max={this.props.vco.get('max')}
          value={this.props.vco.get('frequency')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeOscFreq(v)}
        />
        <div className='oscillator-out-jack'>
          <Jack name='out' onJackClick={() => this.props.connectJack(this.props.vco.get('oscillator'))} />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    vco: state.get('vco')
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack,
    changeOscType,
    changeOscFreq
  }
)(Oscillator)