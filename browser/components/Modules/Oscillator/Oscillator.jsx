import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import { connectJack } from '../../EuroRackActions'
import {
  changeOscType,
  changeOscFreq
} from './OscillatorActions'

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
        <div className='oscillator-in-jack'>
          <Jack name='in to freq'
            color={this.props.vco.getIn(['input', 'frequency'])}
            onJackClick={() => this.props.connectJack('oscillator', 'input', 'frequency', this.props.vco.get('toneComponent').frequency)}
          />
        </div>
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.vco.getIn(['output', 'sound'])}
            onJackClick={() => this.props.connectJack('oscillator', 'output', 'sound', this.props.vco.get('toneComponent'))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    vco: state.eurorack.get('oscillator')
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