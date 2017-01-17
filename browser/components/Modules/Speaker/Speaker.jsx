import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import { connectJack } from '../../EuroRackActions'
import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import Jack from '../../ModuleComponents/Jack'
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
      canvasCtx: null
    }
  }

  componentDidMount() {
    const canvas = document.querySelector('.oscilloscope')
    const canvasCtx = canvas.getContext('2d')
    this.setState({ canvas, canvasCtx, }, () => {
      visualize(this.state.canvas, this.state.canvasCtx, this.props.speaker.get('analyser'))
    })
  }

  render(){
    return (
      <ModuleContainer name='Speaker'>
        <div className='master-out-jack'>
          <Jack
            name='in'
            color={this.props.speaker.getIn(['input', 'sound'])}
            onJackClick={() => this.props.connectJack('speaker', 'input', 'sound', this.props.speaker.get('toneComponent'))}
          />
        </div>
        <div className='canvas-container'>
          <canvas className='oscilloscope'/>
        </div>
        <button onClick={() => stopVisualization()}>STOP DRAW</button>
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
    speaker: state.eurorack.get('speaker')
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack
  }
)(Speaker)