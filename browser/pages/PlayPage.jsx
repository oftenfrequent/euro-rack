import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EuroRack from '../components/EuroRack/EuroRack'

import { resetEuroRack } from '../components/EuroRack/EuroRackActions'
import { addOscillator } from '../components/Modules/Oscillator/OscillatorActions'
import { addLFO } from '../components/Modules/LFO/LFOActions'
import { addEnvelope } from '../components/Modules/Envelope/EnvelopeActions'
import { addFilter } from '../components/Modules/Filter/FilterActions'
import { addConvolutionReverb } from '../components/Modules/ConvolutionReverb/ConvolutionReverbActions'
import { addVCA } from '../components/Modules/VCA/VCAActions'
import { addMIDI } from '../components/Modules/MIDI/MIDIActions'
import { addPingPong } from '../components/Modules/PingPong/PingPongActions'

export class PlayPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    this.props.resetEuroRack()
    this.props.addOscillator()
    this.props.addLFO()
    this.props.addEnvelope()
    this.props.addFilter()
    this.props.addVCA()
    this.props.addMIDI()
    this.props.addConvolutionReverb()
    this.props.addPingPong()
  }

  // componentWillMount() {
  // }

  render () {
    return (
      <EuroRack AddModules={false} />
    )
  }
}

function mapStateToProps (state, props) {
  return {
    // auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  {
    resetEuroRack,
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA,
    addMIDI,
    addConvolutionReverb,
    addPingPong,
 }
)(PlayPage)

