import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  removeEnvelope,
  changeCurve,
  changeValue,
  changeTimeLength
} from './EnvelopeActions'

export class EnvelopeGenerator extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const order = this.props.env.get('flexOrder') ? this.props.env.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='Envelope'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={true}
        removeModuleFunction={() => this.props.removeEnvelope(this.props.id)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.env.get('curveOptions')}
          changeType={(v) => this.props.changeCurve(this.props.id, v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.env.get('timeLengths')}
          changeType={(v) => this.props.changeTimeLength(this.props.id, v)}
        />
        <Knob
          name='attack'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('attack')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'attack', v)}
        />
        <Knob
          name='decay'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('decay')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'decay', v)}
        />
        <Knob
          name='sustain'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('sustain')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'sustain', v)}
        />
        <Knob
          name='release'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('release')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'release', v)}
        />
        <div className='envelope-in-jack'>
          <Jack name='trigger'
            color={this.props.env.getIn(['input', 'trigger'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'trigger', this.props.env.get('toneComponent'), this.props.env.getIn(['input', 'trigger']))}
          />
        </div>
        <div className='envelope-out-jack'>
          <Jack name='out'
            color={this.props.env.getIn(['output', 'envelope'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'envelope', this.props.env.get('toneComponent'), this.props.env.getIn(['output', 'envelope']))}
          />
        </div>
      </ModuleContainer>
    )
  }
          // <Jack name='in'
          //   color={this.props.env.getIn(['input', 'sound'])}
          //   onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.env.get('toneComponent'), this.props.env.getIn(['input', 'sound']))}
          // />
}

function mapStateToProps(state, props) {
  return {
    env: state.envelopes.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    removeEnvelope,
    changeCurve,
    changeValue,
    changeTimeLength
  }
)(EnvelopeGenerator)
