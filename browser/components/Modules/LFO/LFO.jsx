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
  changeLfoPercent
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
    const order = this.props.lfo.get('flexOrder') ? this.props.lfo.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='LFO'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.lfo.get('typeOptions')}
          changeType={(v) => this.props.changeLfoType(this.props.id, v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.lfo.get('valueOptions')}
          changeType={(v) => this.props.changeLfoFreq(this.props.id, v)}
        />
        <DisplayAmount
          type='string'
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
        <Knob
          name='Change'
          min={0}
          max={100}
          value={this.props.lfo.get('percentChange')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoPercent(this.props.id, v)}
        />
        <div className='oscillator-in-jack'>
          <Jack name='amplitude'
            color={this.props.lfo.getIn(['input', 'lfo'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'lfo', this.props.lfo.get('toneComponent').amplitude)}
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
    changeLfoPercent
  }
)(LFO)