import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'
import {
  connectJack,
  changeFilType,
  changeFilFreq,
  changeFilRolloff
} from '../EuroRackActions'

export class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state = { active: false }
  }

  onInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
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
          <Jack name='in'
            color={this.props.fil.getIn(['input', 'sound'])}
            onJackClick={() => this.props.connectJack('filter', 'input', 'sound', this.props.fil.get('toneComponent'))}
          />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out'
            color={this.props.fil.getIn(['output', 'sound'])}
            onJackClick={() => this.props.connectJack('filter', 'output', 'sound', this.props.fil.get('toneComponent'))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    fil: state.eurorack.get('filter')
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
