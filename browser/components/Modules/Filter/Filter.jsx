import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  changeFilType,
  changeFilFreq,
  changeFilRolloff
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
    return (
      <ModuleContainer name='Filter'>
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('typeOptions')}
          changeType={(v) => this.props.changeFilType(this.props.id, v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('rolloffOptions')}
          changeType={(v) => this.props.changeFilRolloff(this.props.id, v)}
        />
        <DisplayAmount
          type='number'
          min={this.props.fil.get('min')}
          max={this.props.fil.get('max')}
          value={this.props.fil.get('frequency')}
          changeValue={(v) => this.props.changeFilFreq(this.props.id, v)}
          active={this.state.active}
          makeActive={() => this.onChangeInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.props.fil.get('min')}
          max={this.props.fil.get('max')}
          value={this.props.fil.get('frequency')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeFilFreq(this.props.id, v)}
        />
        <div className='filter-in-jack'>
          <Jack name='lfo in'
            color={this.props.fil.getIn(['input', 'frequency'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', this.props.fil.get('toneComponent').frequency)}
          />
          <Jack name='in'
            color={this.props.fil.getIn(['input', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.fil.get('toneComponent'))}
          />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out'
            color={this.props.fil.getIn(['output', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.fil.get('toneComponent'))}
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
    changeFilType,
    changeFilFreq,
    changeFilRolloff
  }
)(Filter)
