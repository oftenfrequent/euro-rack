import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  connectJack,
  changeLfoType,
  changeLfoFreq,
  changeLfoMin,
  changeLfoMax
} from '../../EuroRackActions'

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

  onInputActive(type) {
    this.setState({[type]: !this.state[type]})
  }

  render(){
    console.log("this.props.lfo.get('frequency')", this.props.lfo.get('frequency'))
    return (
      <ModuleContainer name='LFO'>
        <DisplayTypeDropdown
          optionTypes={this.props.lfo.get('typeOptions')}
          changeType={(v) => this.props.changeLfoType(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('frequency').toString()}
          changeValue={(v) => this.props.changeLfoFreq(v)}
          active={this.state.activeFreq}
          makeActive={() => this.onInputActive('activeFreq')}
        />
        <Knob
          name='Frequency'
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('frequency')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoFreq(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('maxValue')}
          value={this.props.lfo.get('minValue').toString()}
          changeValue={(v) => this.props.changeLfoMin(v)}
          active={this.state.activeMin}
          makeActive={() => this.onInputActive('activeMin')}
        />
        <Knob
          name='Min Frequency'
          min={this.props.lfo.get('min')}
          max={this.props.lfo.get('maxValue')}
          value={this.props.lfo.get('minValue')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoMin(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.props.lfo.get('minValue')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('maxValue').toString()}
          changeValue={(v) => this.props.changeLfoMax(v)}
          active={this.state.activeMax}
          makeActive={() => this.onInputActive('activeMax')}
        />
        <Knob
          name='Max Frequency'
          min={this.props.lfo.get('minValue')}
          max={this.props.lfo.get('max')}
          value={this.props.lfo.get('maxValue')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeLfoMax(v)}
        />
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.lfo.getIn(['output', 'lfo'])}
            onJackClick={() => this.props.connectJack('lfo', 'output', 'lfo', this.props.lfo.get('toneComponent'))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    lfo: state.eurorack.get('lfo')
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack,
    changeLfoType,
    changeLfoFreq,
    changeLfoMin,
    changeLfoMax
  }
)(LFO)