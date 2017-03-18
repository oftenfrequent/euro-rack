import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import Jack from '../../ModuleComponents/Jack'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import { initSpeaker, changeBPM } from './SpeakerActions'
import {
  visualize,
  stopVisualization
} from './Oscilloscope'

export class Speaker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      speakerArray: [6,10,14,14,14,14,14,14,14,14,10,6],
      canvas: null,
      canvasCtx: null,
      oscilloscopeOn: false,
      bpmActive: false
    }
  }

  componentDidMount() {
    this.props.initSpeaker()
    const canvas = document.querySelector('.oscilloscope')
    const canvasCtx = canvas.getContext('2d')
    this.setState({ canvas, canvasCtx, oscilloscopeOn: true }, () => {
      visualize(this.state.canvas, this.state.canvasCtx, this.props.speaker.get('analyser'))
    })
  }

  toggleVisualization() {
    if (this.state.oscilloscopeOn) {
      this.setState({ oscilloscopeOn: false }, () => {
        stopVisualization(this.state.canvas, this.state.canvasCtx)
      })
    } else {
      this.setState({ oscilloscopeOn: true }, () => {
        visualize(this.state.canvas, this.state.canvasCtx, this.props.speaker.get('analyser'))
      })
    }
  }

  onChangeActive() {
    this.setState({bpmActive: !this.state.bpmActive})
  }

  render(){
    const order = this.props.speaker.get('flexOrder') ? this.props.speaker.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='Speaker'
        order={order}
        draggable={false}
      >
        <div className='bpm-container'>
          <DisplayAmount
            type='number'
            suffix='bpm'
            min={this.props.speaker.get('min')}
            max={this.props.speaker.get('max')}
            value={this.props.speaker.get('currentBPM')}
            changeValue={(v) => this.props.changeBPM(v)}
            active={this.state.bpmActive}
            changeActive={() => this.onChangeActive()}
          />
        </div>
        <div className='master-out-jack'>
          <Jack
            name='in'
            attention={this.props.speaker.getIn(['input', 'sound', 'attention'])}
            color={this.props.speaker.getIn(['input', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, 'only', 'input', 'sound', this.props.speaker.get('analyser'), this.props.speaker.getIn(['input', 'sound', 'color']))}
          />
        </div>
        <div className='canvas-container'>
          <canvas className='oscilloscope'
            onClick={() => this.toggleVisualization()}
          />
        </div>
        <div className='speaker-hole-container'>
          {this.state.speakerArray.map( (num,i) =>
            <div className='speaker-hole-row' key={i} >
              {Array.from(Array(num)).map( (i,j) => <div className='speaker-hole' key={j}></div>)}
            </div>
          )}
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    speaker: state.speaker.get('only')
  }
}

export default connect(
  mapStateToProps,
  {
    initSpeaker,
    changeBPM
  }
)(Speaker)