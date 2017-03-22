import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeLFO,
  changeLfoFreq,
  changeLfoPercent,
  toggleLfoTimeAndFreq
} from './LFOActions'

export class LFO extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeFreq: false
    }
  }

  onChangeInputActive(type) {
    this.setState({[type]: !this.state[type]})
  }

  render(){
    const oscTypes = Array.from(this.props.lfo.getIn(['output']).keys())
    const order = this.props.lfo.get('flexOrder') ? this.props.lfo.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='LFO'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={true}
        removeModuleFunction={() => this.props.removeLFO(this.props.id)}
      >
        <button
          onClick={() => this.props.toggleLfoTimeAndFreq(this.props.id)}
        >{this.props.lfo.get('timelineBased') ? 'Beats' : 'Frequency'}</button>


        {this.props.lfo.get('timelineBased')
          ?(<DisplayTypeDropdown
              optionTypes={this.props.lfo.get('valueOptions')}
              changeType={(v) => this.props.changeLfoFreq(this.props.id, v)}
              defaultValue={this.props.lfo.get('timelineFrequency')}
            />
          ):(<div>
              <KnobAndAmount
                type='number'
                name='Frequency'
                min={this.props.lfo.get('min')}
                max={this.props.lfo.get('max')}
                value={this.props.lfo.get('frequency')}
                suffix='Hz'
                degreesTotal={270}
                sensitivity={100}
                onNewValue={(v) => this.props.changeLfoFreq(this.props.id, v)}
              />
            </div>
          )
        }


        <KnobAndAmount
          name='Change'
          min={0}
          max={100}
          suffix='%'
          value={this.props.lfo.get('percentChange')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoPercent(this.props.id, v)}
        />
        <div className='oscillator-in-jack'>
          <Jack name='amplitude'
            attention={this.props.lfo.getIn(['input', 'amplitude', 'attention'])}
            color={this.props.lfo.getIn(['input', 'amplitude', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'amplitude', 'ALL_LFO_AMPLITUDES', this.props.lfo.getIn(['input', 'amplitude', 'color']))}
          />
        </div>
        <div className='waveforms-out-row'>
          <div className='waveforms-centered-row'>
            {oscTypes.map( (type, i) =>
              <Jack
                key={i}
                name={type.length > 4 ? type.substr(0,3) : type}
                attention={this.props.lfo.getIn(['output', type, 'attention'])}
                color={this.props.lfo.getIn(['output', type, 'color'])}
                onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', type, this.props.lfo.getIn(['output', type, 'toneComponent']), this.props.lfo.getIn(['output', type, 'color']))}
              />
            )}
          </div>
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    lfo: state.lfos.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    removeLFO,
    changeLfoFreq,
    changeLfoPercent,
    toggleLfoTimeAndFreq
  }
)(LFO)