import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import {
  connectJack,
  changeCurve,
  changeValue,
  triggerAttackRelease
} from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

export class EnvelopeGenerator extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <ModuleContainer name='Envelope'>
        <DisplayTypeDropdown
          optionTypes={this.props.env.get('curveOptions')}
          changeType={(v) => this.onChangeType(v)}
        />
        <Knob
          name='attack'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('attack')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue('attack', v)}
        />
        <Knob
          name='decay'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('decay')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue('decay', v)}
        />
        <Knob
          name='sustain'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('sustain')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue('sustain', v)}
        />
        <Knob
          name='release'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('release')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue('release', v)}
        />
        <div className='envelope-in-jack'>
          <Jack name='in' onJackClick={() => this.props.connectJack(this.props.env.get('envelope'))}/>
        </div>
        <div className='envelope-out-jack'>
          <Jack name='out' onJackClick={() => this.props.connectJack(this.props.env.get('envelope'))}/>
        </div>
        <button onClick={() => this.props.triggerAttackRelease()}>triggerAttackRelease</button>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    env: state.get('env')
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack,
    changeCurve,
    changeValue,
    triggerAttackRelease
  }
)(EnvelopeGenerator)
