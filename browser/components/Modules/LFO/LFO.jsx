import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  changeLfoType,
  changeLfoFreq,
  changeLfoMin,
  changeLfoMax
} from './LFOActions'

export class LFO extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeFreq: false,
      activeMin: false,
      activeMax: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  onChangeInputActive(type) {
    this.setState({[type]: !this.state[type]})
  }

  render(){
    return (
      <ModuleContainer name='LFO'>
        <DisplayTypeDropdown
          optionTypes={this.props.lfo.get('typeOptions')}
          changeType={(v) => this.props.changeLfoType(this.props.id, v)}
        />
        <DisplayAmount
          type='number'
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('frequency')}
          changeValue={(v) => this.props.changeLfoFreq(this.props.id, v)}
          active={this.state.activeFreq}
          changeActive={() => this.onChangeInputActive('activeFreq')}
        />
        <Knob
          name='Frequency'
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('frequency')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoFreq(this.props.id, v)}
        />
        <DisplayAmount
          type='number'
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('maxValue')}
          value={this.props.lfo.get('minValue')}
          changeValue={(v) => this.props.changeLfoMin(this.props.id, v)}
          active={this.state.activeMin}
          changeActive={() => this.onChangeInputActive('activeMin')}
        />
        <Knob
          name='Min Frequency'
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('maxValue')}
          value={this.props.lfo.get('minValue')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoMin(this.props.id, v)}
        />
        <DisplayAmount
          type='number'
          min={this.props.lfo.get('minValue')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('maxValue')}
          changeValue={(v) => this.props.changeLfoMax(this.props.id, v)}
          active={this.state.activeMax}
          changeActive={() => this.onChangeInputActive('activeMax')}
        />
        <Knob
          name='Max Frequency'
          min={this.props.lfo.get('minValue')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('maxValue')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoMax(this.props.id, v)}
        />
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.lfo.getIn(['output', 'lfo'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'lfo', this.props.lfo.get('toneComponent'))}
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
    changeLfoMin,
    changeLfoMax
  }
)(LFO)