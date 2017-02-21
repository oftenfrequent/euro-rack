import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeFilter,
  changeFilType,
  changeFilFreq,
  changeFilRolloff,
  changeFilResonace
} from './FilterActions'

export class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state = { active: false }
  }

  onChangeInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
    const order = this.props.fil.get('flexOrder') ? this.props.fil.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='Filter'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={true}
        removeModuleFunction={() => this.props.removeFilter(this.props.id)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('typeOptions')}
          changeType={(v) => this.props.changeFilType(this.props.id, v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('rolloffOptions')}
          changeType={(v) => this.props.changeFilRolloff(this.props.id, v)}
        />
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='freq cv'
              color={this.props.fil.getIn(['input', 'frequency'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', this.props.fil.get('toneComponent').frequency, this.props.fil.getIn(['input', 'frequency']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Frequency'
              min={this.props.fil.get('min')}
              max={this.props.fil.get('max')}
              value={this.props.fil.get('frequency')}
              suffix='Hz'
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeFilFreq(this.props.id, v)}
            />
          </div>
        </div>
        <div className='jack-knob-pair clearfix no-amount-pair'>
          <div className='paired-jack'>
            <Jack name='res cv'
              color={this.props.fil.getIn(['input', 'resonance'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'resonance', this.props.fil.get('toneComponent').Q, this.props.fil.getIn(['input', 'resonance']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Resonance'
              min={this.props.fil.get('minQ')*1000}
              max={this.props.fil.get('maxQ')*1000}
              value={this.props.fil.get('q')*1000}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeFilResonace(this.props.id, (v/1000))}
            />
          </div>
        </div>
        <div className='filter-in-jack'>
          <Jack name='audio in'
            color={this.props.fil.getIn(['input', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.fil.get('toneComponent'), this.props.fil.getIn(['input', 'sound']))}
          />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out'
            color={this.props.fil.getIn(['output', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.fil.get('toneComponent'), this.props.fil.getIn(['output', 'sound']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    fil: state.filters.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    removeFilter,
    changeFilType,
    changeFilFreq,
    changeFilRolloff,
    changeFilResonace
  }
)(Filter)
