import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeVCA,
  changeVCAGain,
  initializeVCA
} from './VCAActions'

export class VCA extends React.Component {
  constructor(props){
    super(props)
   // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      activeOutput: false,
      activeInput1: false,
      activeInput2: false
    }
  }

  componentDidMount() {
    this.props.initializeVCA(this.props.id)
  }

  onChangeInputActive(which) {
    this.setState({[which]: !this.state[which]})
  }

  render(){
    const order = this.props.vca.get('flexOrder') ? this.props.vca.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='VCA'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={this.props.removeModule}
        removeModuleFunction={() => this.props.removeVCA(this.props.id)}
      >
        <div className='jack-knob-pair clearfix no-amount-pair'>
          <div className='paired-jack'>
            <Jack name='cv1'
              attention={this.props.vca.getIn(['input', 'cv1', 'attention'])}
              color={this.props.vca.getIn(['input', 'cv1', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cv1', this.props.vca.get('outputToneComponent').gain, this.props.vca.getIn(['input', 'cv1', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Gain'
              min={this.props.vca.get('min')}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('outputValue')}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeVCAGain(v, this.props.id, 'outputValue')}
            />
          </div>
        </div>

        <div className='jack-knob-pair clearfix no-amount-pair'>
          <div className='paired-jack'>
            <Jack name='Audio In 1'
              attention={this.props.vca.getIn(['input', 'audioIn1', 'attention'])}
              color={this.props.vca.getIn(['input', 'audioIn1', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'audioIn1', this.props.vca.get('input1ToneComponent'), this.props.vca.getIn(['input', 'audioIn1', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Gain'
              min={this.props.vca.get('min')}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('input1Value')}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeVCAGain(v, this.props.id, 'input1Value')}
            />
          </div>
        </div>

        <div className='jack-knob-pair clearfix no-amount-pair'>
          <div className='paired-jack'>
            <Jack name='Audio In 2'
              attention={this.props.vca.getIn(['input', 'audioIn2', 'attention'])}
              color={this.props.vca.getIn(['input', 'audioIn2', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'audioIn2', this.props.vca.get('input2ToneComponent'), this.props.vca.getIn(['input', 'audioIn2', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Gain'
              min={this.props.vca.get('min')}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('input2Value')}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeVCAGain(v, this.props.id, 'input2Value')}
            />
          </div>
        </div>

        <div className='oscillator-out-jack'>
          <Jack name='out'
            attention={this.props.vca.getIn(['output', 'audio', 'attention'])}
            color={this.props.vca.getIn(['output', 'audio', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'audio', this.props.vca.get('outputToneComponent'), this.props.vca.getIn(['output', 'audio', 'color']))}
          />
        </div>
      </ModuleContainer>
    )
  }
        // <div className='oscillator-in-jack'>
        //   <Jack name='cv2'
        //     color={this.props.vca.getIn(['input', 'cv2'])}
        //     onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cv2', this.props.vca.get('outputToneComponent').gain, this.props.vca.getIn(['input', 'cv2']))}
        //   />
        // </div>
}

function mapStateToProps(state, props) {
  return {
    vca: state.vcas.get(props.id),
    removeModule: state.eurorack.get('addModules')
  }
}

export default connect(
  mapStateToProps,
  {
    removeVCA,
    changeVCAGain,
    initializeVCA
  }
)(VCA)