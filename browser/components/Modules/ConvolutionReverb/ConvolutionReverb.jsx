import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeConvolutionReverb,
  changeImpulseResponse,
  changeWetness,
  // changeLfoFreq,
  // changeLfoPercent,
  // toggleLfoTimeAndFreq
} from './ConvolutionReverbActions'

const context = new AudioContext();

export class ConvolutionReverb extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     activeFreq: false
  //   }
  // }

  onChangeInputActive(type) {
    this.setState({[type]: !this.state[type]})
  }

  changeImpulse(e) {
    console.log('e', e.target)
    console.log('value', e.target.value)
    console.log('files', e.target.files)
    const file = e.target.files[0]

    const url = URL.createObjectURL(file)
    this.props.changeImpulseResponse(this.props.id, url)

    var reader = new FileReader();

    // reader.onloadend = (event) => {
    //   console.log('reader.result', reader.result)
    //   const source = context.decodeAudioData(reader.result)
    //   this.props.changeImpulseResponse(this.props.id, source)

    //         // return function(e) {
    //         //   // Render thumbnail.
    //         //   var span = document.createElement('span');
    //         //   span.innerHTML = ['<img class="thumb" src="', e.target.result,
    //         //                     '" title="', escape(theFile.name), '"/>'].join('');
    //         //   document.getElementById('list').insertBefore(span, null);
    //         // };
    //       };
    // reader.readAsArrayBuffer(file)
    //   .then(buffer => {
    //     console.log('buffer', buffer)
    //   })

    // console.log('e', e.target)
  }

  render(){
    const oscTypes = Array.from(this.props.reverb.getIn(['output']).keys())
    const order = this.props.reverb.get('flexOrder') ? this.props.reverb.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='CONVOLVER'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={this.props.removeModule}
        removeModuleFunction={() => this.props.removeConvolutionReverb(this.props.id)}
      >
        <input
          type="file"
          accept=".wav"
          onChange={(e) => this.changeImpulse(e)}
        />


        <KnobAndAmount
          name='Wetness'
          min={0}
          max={100}
          suffix='%'
          value={this.props.reverb.get('wetness')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeWetness(this.props.id, v)}
        />
        <Jack name='wetness'
          attention={this.props.reverb.getIn(['input', 'wetness', 'attention'])}
          color={this.props.reverb.getIn(['input', 'wetness', 'color'])}
          onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'wetness', this.props.reverb.get('toneComponent'), this.props.reverb.getIn(['input', 'wetness', 'color']))}
        />
        <div className='filter-in-jack'>
          <Jack name='audio in'
            attention={this.props.reverb.getIn(['input', 'sound', 'attention'])}
            color={this.props.reverb.getIn(['input', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.reverb.get('toneComponent'), this.props.reverb.getIn(['input', 'sound', 'color']))}
          />
        </div>
        <div className='filter-out-jack'>
          <Jack name='audio out'
            attention={this.props.reverb.getIn(['output', 'sound', 'attention'])}
            color={this.props.reverb.getIn(['output', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.reverb.get('toneComponent'), this.props.reverb.getIn(['output', 'sound', 'color']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    reverb: state.convolutionReverbs.get(props.id),
    removeModule: state.eurorack.get('addModules')

  }
}

export default connect(
  mapStateToProps,
  {
    removeConvolutionReverb,
    changeImpulseResponse,
    changeWetness,
    // changeLfoFreq,
    // changeLfoPercent,
    // toggleLfoTimeAndFreq
  }
)(ConvolutionReverb)