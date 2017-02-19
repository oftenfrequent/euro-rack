import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  changeLfoType,
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
    const order = this.props.lfo.get('flexOrder') ? this.props.lfo.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='LFO'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
      >
        <button
          onClick={() => this.props.toggleLfoTimeAndFreq(this.props.id)}
        >{this.props.lfo.get('timelineBased') ? 'Beats' : 'Frequency'}</button>

        <DisplayTypeDropdown
          optionTypes={this.props.lfo.get('typeOptions')}
          changeType={(v) => this.props.changeLfoType(this.props.id, v)}
        />

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
            color={this.props.lfo.getIn(['input', 'amplitude'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'amplitude', this.props.lfo.get('toneComponent').amplitude, this.props.lfo.getIn(['input', 'amplitude']))}
          />
        </div>
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.lfo.getIn(['output', 'lfo'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'lfo', this.props.lfo.get('toneComponent'), this.props.lfo.getIn(['output', 'lfo']))}
          />
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
    changeLfoType,
    changeLfoFreq,
    changeLfoPercent,
    toggleLfoTimeAndFreq
  }
)(LFO)