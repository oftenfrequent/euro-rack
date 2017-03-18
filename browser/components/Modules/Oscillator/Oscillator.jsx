import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeOscillator,
  // changeOscType,
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
        // <DisplayTypeDropdown
        //   optionTypes={this.props.vco.get('typeOptions')}
          // changeType={(v) => this.props.changeOscType(v, this.props.id)}
        // />

  render(){
    const oscTypes = Array.from(this.props.vco.getIn(['output']).keys())
    console.log('oscTypes', oscTypes)
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
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='freq'
              color={this.props.vco.getIn(['input', 'frequency', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', 'ALL_OSC_TYPES', this.props.vco.getIn(['input', 'frequency', 'color']))}
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
              onNewValue={(v) => this.props.changeOscFreq(v, this.props.id)}
            />
          </div>
        </div>
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='cv'
              color={this.props.vco.getIn(['input', 'cvFrequency', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cvFrequency', 'ALL_OSC_TYPES', this.props.vco.getIn(['input', 'cvFrequency', 'color']))}
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
              onNewValue={(v) => this.props.changeOscFreq(v, this.props.id)}
            />
          </div>
        </div>
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='pulse modulation'
              color={this.props.vco.getIn(['input', 'pwModulation', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'pwModulation', this.props.vco.getIn(['output', 'pwm', 'toneComponent']).modulationFrequency, this.props.vco.getIn(['input', 'pwModulation', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Modulation'
              type='number'
              min={this.props.vco.get('min')}
              max={this.props.vco.get('max')}
              value={this.props.vco.getIn(['output', 'pwm', 'modulationFrequency'])}
              degreesTotal={270}
              sensitivity={100}
              suffix='Hz'
              onNewValue={(v) => this.props.changeOscModFreq(v, this.props.id)}
            />
          </div>
        </div>
        <div className='waveforms-out-row'>
          <div className='waveforms-centered-row'>
            {oscTypes.map( (type, i) =>
              <Jack
                key={i}
                name={type.length > 4 ? type.substr(0,3) : type}
                attention={this.props.vco.getIn(['output', type, 'attention'])}
                color={this.props.vco.getIn(['output', type, 'color'])}
                onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', type, this.props.vco.getIn(['output', type, 'toneComponent']), this.props.vco.getIn(['output', type, 'color']))}
              />
            )}
          </div>
        </div>
      </ModuleContainer>
    )
  }
}
            // <Jack name='tri'
            //   attention={this.vco.getIn(['output', type, 'attention'])}
            //   color={this.props.vco.getIn(['output', 'triangle', 'color'])}
            //   onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'triangle', this.props.vco.getIn(['output', 'triangle', 'toneComponent']), this.props.vco.getIn(['output', 'triangle', 'color']))}
            // />
            // <Jack name='saw'
            //   attention={this.vco.getIn(['output', type, 'attention'])}
            //   color={this.props.vco.getIn(['output', 'sawtooth', 'color'])}
            //   onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sawtooth', this.props.vco.getIn(['output', 'sawtooth', 'toneComponent']), this.props.vco.getIn(['output', 'sawtooth', 'color']))}
            // />
            // <Jack name='pulse'
            //   attention={this.vco.getIn(['output', type, 'attention'])}
            //   color={this.props.vco.getIn(['output', 'pwm', 'color'])}
            //   onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'pwm', this.props.vco.getIn(['output', 'pwm', 'toneComponent']), this.props.vco.getIn(['output', 'pwm', 'color']))}
            // />

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
    // changeOscType,
    changeOscFreq,
    changeOscModFreq
  }
)(Oscillator)