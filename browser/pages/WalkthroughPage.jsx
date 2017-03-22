import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import EuroRack from '../components/EuroRack/EuroRack'
import { resetEuroRack } from '../components/EuroRack/EuroRackActions'
import WalkthroughText from '../components/Walkthrough/WalkthroughText'
import { addOscillator } from '../components/Modules/Oscillator/OscillatorActions'
import { addLFO } from '../components/Modules/LFO/LFOActions'
import { addEnvelope } from '../components/Modules/Envelope/EnvelopeActions'
import { addFilter } from '../components/Modules/Filter/FilterActions'
import { addVCA } from '../components/Modules/VCA/VCAActions'
import { addMIDI } from '../components/Modules/MIDI/MIDIActions'
import { walkthrough, walkthroughStep } from '../components/Walkthrough/WalkthroughActions'

export class WalkthroughPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      walkthrough: new walkthrough('Initial Introduction', props)
    }
  }

  componentWillMount() {
    this.props.resetEuroRack()
  }

  componentDidMount() {
    this.state.walkthrough.nextStep()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.walkthrough.currentStep > -1 && this.state.walkthrough.steps[this.state.walkthrough.currentStep].hasStepCompleted(this.props.state)) {
      this.state.walkthrough.nextStep()
    }
  }

  render () {
    return (
      <div>
        <EuroRack AddModules={false} />
        <WalkthroughText/>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    state: state,
    oscillators: state.oscillators
  }
}

export default connect(
  mapStateToProps,
  {
    resetEuroRack,
    walkthroughStep,
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA,
    addMIDI
 }
)(WalkthroughPage)

