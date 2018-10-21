import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removePingPong,
  togglePPTimeAndFreq,
  changePPTime,
  changePPWet,
  changePPFeedback,
  // changeFilFreq,
  // changeFilRolloff,
  // changeFilResonace
} from './PingPongActions'

export class PingPong extends React.Component {
  constructor(props){
    super(props)
    this.state = { active: false }
  }

  onChangeInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
    const order = this.props.pp.get('flexOrder') ? this.props.pp.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='PingPong'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={this.props.removeModule}
        removeModuleFunction={() => this.props.removePingPong(this.props.id)}
      >
        <button
          onClick={() => this.props.togglePPTimeAndFreq(this.props.id)}
        >{this.props.pp.get('timelineBased') ? 'Beats' : 'Frequency'}</button>
        <DisplayTypeDropdown
          optionTypes={this.props.pp.get('valueOptions')}
          changeType={(v) => this.props.changePPTime(this.props.id, v)}
          defaultValue={this.props.pp.get('timelineFrequency')}
        />
        {/*<KnobAndAmount
          name='Delay Time'
          min={this.props.pp.get('minDelayTime')}
          max={this.props.pp.get('maxDelayTime')}
          value={this.props.pp.get('delayTime')}
          suffix='ms'
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changePPTime(this.props.id, v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.pp.get('rolloffOptions')}
          changeType={(v) => this.props.changeFilRolloff(this.props.id, v)}
        />*/}
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='freq cv'
              attention={this.props.pp.getIn(['input', 'frequency', 'attention'])}
              color={this.props.pp.getIn(['input', 'frequency', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', this.props.pp.get('toneComponent').frequency, this.props.pp.getIn(['input', 'frequency', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Wetness'
              min={this.props.pp.get('min')}
              max={this.props.pp.get('max')}
              value={this.props.pp.get('wetness')}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changePPWet(this.props.id, v)}
            />
          </div>
        </div>
        <div className='jack-knob-pair clearfix no-amount-pair'>
          <div className='paired-jack'>
            <Jack name='res cv'
              attention={this.props.pp.getIn(['input', 'resonance', 'attention'])}
              color={this.props.pp.getIn(['input', 'resonance', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'resonance', this.props.pp.get('toneComponent').Q, this.props.pp.getIn(['input', 'resonance', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Feedback'
              min={this.props.pp.get('min')}
              max={this.props.pp.get('max')}
              value={this.props.pp.get('feedback')}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changePPFeedback(this.props.id, v)}
            />
          </div>
        </div>
        <div className='filter-in-jack'>
          <Jack name='audio in'
            attention={this.props.pp.getIn(['input', 'sound', 'attention'])}
            color={this.props.pp.getIn(['input', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.pp.get('toneComponent'), this.props.pp.getIn(['input', 'sound', 'color']))}
          />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out'
            attention={this.props.pp.getIn(['output', 'sound', 'attention'])}
            color={this.props.pp.getIn(['output', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.pp.get('toneComponent'), this.props.pp.getIn(['output', 'sound', 'color']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    pp: state.pingPongs.get(props.id),
    removeModule: state.eurorack.get('addModules')
  }
}

export default connect(
  mapStateToProps,
  {
    removePingPong,
    togglePPTimeAndFreq,
    changePPTime,
    changePPWet,
    changePPFeedback,
    // changeFilFreq,
    // changeFilRolloff,
    // changeFilResonace
  }
)(PingPong)
