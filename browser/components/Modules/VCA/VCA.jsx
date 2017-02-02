import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  changeVCAGain,
} from './VCAActions'

export class VCA extends React.Component {
  constructor(props){
    super(props)
   // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      active: false
    }
  }

  onChangeInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
    return (
      <ModuleContainer name='VCA'>
        <DisplayAmount
          type='number'
          min={this.props.vca.get('min')}
          changeActive={() => this.onChangeInputActive()}
          max={this.props.vca.get('max')}
          value={this.props.vca.get('value')}
          changeValue={(v) => this.props.changeVCAGain(v, this.props.id)}
          active={this.state.active}
          changeActive={() => this.onChangeInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.props.vca.get('min')}
          max={this.props.vca.get('max')}
          value={this.props.vca.get('value')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeVCAGain(v, this.props.id)}
        />
        <div className='oscillator-in-jack'>
          <Jack name='cv1'
            color={this.props.vca.getIn(['input', 'cv1'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cv1', this.props.vca.get('toneComponent').gain, this.props.vca.getIn(['input', 'cv1']))}
          />
          <Jack name='cv2'
            color={this.props.vca.getIn(['input', 'cv2'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cv2', this.props.vca.get('toneComponent').gain, this.props.vca.getIn(['input', 'cv2']))}
          />
          <Jack name='Audio In 1'
            color={this.props.vca.getIn(['input', 'audioIn1'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'audioIn1', this.props.vca.get('toneComponent'), this.props.vca.getIn(['input', 'audioIn1']))}
          />
          <Jack name='Audio In 2'
            color={this.props.vca.getIn(['input', 'audioIn2'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'audioIn2', this.props.vca.get('toneComponent'), this.props.vca.getIn(['input', 'audioIn2']))}
          />
        </div>
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.vca.getIn(['output', 'audio'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'audio', this.props.vca.get('toneComponent'), this.props.vca.getIn(['output', 'audio']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    vca: state.vcas.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    changeVCAGain
  }
)(VCA)