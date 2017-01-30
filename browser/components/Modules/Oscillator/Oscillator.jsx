import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import { connectJack, disconnectJack } from '../../EuroRackActions'
import {
  changeOscType,
  changeOscFreq,
  changeOscModFreq
} from './OscillatorActions'

export class Oscillator extends React.Component {
  constructor(props){
    super(props)
   // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      active: false
    }
  }

  onChangeInputActive() {
    this.setState({active: !this.state.active})
  }

  handleJackClick(e, module, direction, cvName, toneObject, color) {
    e.preventDefault()
    const eventType = e.type // click or contextmenu
    if (!color && eventType === 'click') {
      this.props.connectJack(module, direction, cvName, toneObject)
    } else if (color && eventType === 'contextmenu') {
      this.props.disconnectJack(color)
    }
  }

  render(){
    return (
      <ModuleContainer name='VCO'>
        <DisplayTypeDropdown
          optionTypes={this.props.vco.get('typeOptions')}
          changeType={(v) => this.props.changeOscType(v)}
        />
        <DisplayAmount
          type='number'
          min={this.props.vco.get('min')}
          changeActive={() => this.onChangeInputActive()}
          max={this.props.vco.get('max')}
          value={this.props.vco.get('frequency').toString()}
          changeValue={(v) => this.props.changeOscFreq(v)}
          active={this.state.active}
          changeActive={() => this.onChangeInputActive()}
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
        {this.props.vco.get('type') === 'pwm'
          ?
            <Knob
              name='Modulation'
              min={0}
              max={200}
              value={this.props.vco.get('modulationFrequency')}
              degreesTotal={270}
              sensitivity={1000}
              onNewValue={(v) => this.props.changeOscModFreq(v)}
            />
          : null
        }
        <div className='oscillator-in-jack'>
          <Jack name='in to freq'
            color={this.props.vco.getIn(['input', 'frequency'])}
            onJackClick={(e) => this.handleJackClick(e, 'oscillator', 'input', 'frequency', this.props.vco.get('toneComponent').frequency, this.props.vco.getIn(['input', 'frequency']))}
          />
        </div>
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.vco.getIn(['output', 'sound'])}
            onJackClick={(e) => this.handleJackClick(e, 'oscillator', 'output', 'sound', this.props.vco.get('toneComponent'), this.props.vco.getIn(['output', 'sound']))}
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
    changeOscFreq,
    changeOscModFreq,
    disconnectJack
  }
)(Oscillator)