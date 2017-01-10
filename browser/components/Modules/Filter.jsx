import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import {
  connectJack,
  changeFilType,
  changeFilFreq,
  changeFilRolloff
} from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

export class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state = { active: false }
  }

  onInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
    const style = {transform: `rotate(${this.state.degreesValue}deg)`}
    return (
      <ModuleContainer name='Filter'>
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('typeOptions')}
          changeType={(v) => this.props.changeFilType(v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('rolloffOptions')}
          changeType={(v) => this.props.changeRolloff(v)}
        />
        <DisplayAmount
          type={'number'}
          min={this.props.fil.get('min')}
          max={this.props.fil.get('max')}
          value={this.props.fil.get('frequency').toString()}
          changeValue={(v) => this.props.changeFilFreq(v)}
          active={this.state.active}
          makeActive={() => this.onInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.props.fil.get('min')}
          max={this.props.fil.get('max')}
          value={this.props.fil.get('frequency')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeFilFreq(v)}
        />
        <div className='filter-in-jack'>
          <Jack name='in' onJackClick={() => this.props.connectJack(this.props.fil.get('filter'))} />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out' onJackClick={() => this.props.connectJack(this.props.fil.get('filter'))} />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    fil: state.get('fil')
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack,
    changeFilType,
    changeFilFreq,
    changeFilRolloff
  }
)(Filter)
