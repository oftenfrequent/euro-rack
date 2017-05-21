import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
    console.log('this.props.env', this.props.env.toJS())
    const order = this.props.env.get('flexOrder') ? this.props.env.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='Envelope'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={this.props.removeModule}
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
            attention={this.props.env.getIn(['input', 'trigger', 'attention'])}
            color={this.props.env.getIn(['input', 'trigger', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'trigger', 'ALL_ENV', this.props.env.getIn(['input', 'trigger', 'color']))}
          />
        </div>
        <div className='envelope-out-jack'>
          <Jack name='output'
            attention={this.props.env.getIn(['output', 'output1', 'attention'])}
            color={this.props.env.getIn(['output', 'output1', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'output1', this.props.env.getIn(['output', 'output1', 'toneComponent']), this.props.env.getIn(['output', 'output1', 'color']))}
          />
          <Jack name='output'
            attention={this.props.env.getIn(['output', 'output2', 'attention'])}
            color={this.props.env.getIn(['output', 'output2', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'output2', this.props.env.getIn(['output', 'output2', 'toneComponent']), this.props.env.getIn(['output', 'output2', 'color']))}
          />
          <Jack name='inverse'
            attention={this.props.env.getIn(['output', 'inverse', 'attention'])}
            color={this.props.env.getIn(['output', 'inverse', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'inverse', this.props.env.getIn(['output', 'inverse', 'toneComponent']), this.props.env.getIn(['output', 'inverse', 'color']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
    console.log('state', state)
  return {
    env: state.envelopes.get(props.id),
    removeModule: state.eurorack.get('addModules')
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


EnvelopeGenerator.propTypes = {
  id: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  changeOrder: PropTypes.func.isRequired,
  onJackClick: PropTypes.func.isRequired
}