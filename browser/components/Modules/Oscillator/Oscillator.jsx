import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeOscillator,
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

  render(){
    const pwPairedClasses = classNames({'jack-knob-pair': true, 'clearfix': true, 'inactive': this.props.vco.get('type') !== 'pwm'})
    const order = this.props.vco.get('flexOrder') ? this.props.vco.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='VCO'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={true}
        removeModuleFunction={() => this.props.removeOscillator(this.props.id)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.vco.get('typeOptions')}
          changeType={(v) => this.props.changeOscType(v, this.props.id)}
        />
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='freq'
              color={this.props.vco.getIn(['input', 'frequency'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', this.props.vco.get('toneComponent').frequency, this.props.vco.getIn(['input', 'frequency']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Frequency'
              type='number'
              min={this.props.vco.get('min')}
              max={this.props.vco.get('max')}
              value={this.props.vco.get('frequency')}
              degreesTotal={270}
              sensitivity={100}
              suffix='Hz'
              onNewValue={(v) => this.props.changeOscFreq(v, this.props.id, this.props.vco.getIn(['input', 'frequency']), this.props.vco.getIn(['input', 'cv']))}
            />
          </div>
        </div>
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='cv'
              color={this.props.vco.getIn(['input', 'cvFrequency'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cvFrequency', this.props.vco.get('toneComponent').frequency, this.props.vco.getIn(['input', 'cvFrequency']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='NOTHING'
              type='number'
              min={this.props.vco.get('min')}
              max={this.props.vco.get('max')}
              value={this.props.vco.get('frequency')}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeOscFreq(v, this.props.id, this.props.vco.getIn(['input', 'frequency']), this.props.vco.getIn(['input', 'cv']))}
            />
          </div>
        </div>
        <div className={pwPairedClasses}>
          <div className='paired-jack'>
            <Jack name='pulse modulation'
              color={this.props.vco.getIn(['input', 'pwModulation'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'pwModulation', this.props.vco.get('toneComponent').modulationFrequency, this.props.vco.getIn(['input', 'pwModulation']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Modulation'
              type='number'
              min={this.props.vco.get('min')}
              max={this.props.vco.get('max')}
              value={this.props.vco.get('modulationFrequency')}
              degreesTotal={270}
              sensitivity={100}
              suffix='Hz'
              onNewValue={(v) => this.props.changeOscModFreq(v, this.props.id)}
            />
          </div>
        </div>
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.vco.getIn(['output', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.vco.get('toneComponent'), this.props.vco.getIn(['output', 'sound']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    vco: state.oscillators.get(props.id),
    currentJackColor: state.eurorack.get()
  }
}

export default connect(
  mapStateToProps,
  {
    removeOscillator,
    changeOscType,
    changeOscFreq,
    changeOscModFreq
  }
)(Oscillator)