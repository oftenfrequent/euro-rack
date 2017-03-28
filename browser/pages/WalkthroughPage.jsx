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
import { walkthrough, walkthroughStep, walkthroughStepCompleted, walkthroughCompleted } from '../components/Walkthrough/WalkthroughActions'

export class WalkthroughPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      walkthrough: new walkthrough('Initial Introduction', props),
      showOptOutMessage: true
    }
  }

  componentWillMount() {
    this.props.resetEuroRack()
  }

  componentDidMount() {
    this.state.walkthrough.nextStep()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.stepCompleted && this.state.walkthrough.steps[this.state.walkthrough.currentStep].hasStepCompleted(this.props.state)) {
      if (!this.state.walkthrough.steps[this.state.walkthrough.currentStep].completedText) {
        this.state.walkthrough.nextStep()
      } else {
        this.props.walkthroughStepCompleted()
      }
    }
    if (this.state.walkthrough.currentStep > 0 && this.state.showOptOutMessage) {
      this.setState({ showOptOutMessage: false })
    }
  }

  callNextStep(e) {
    e.preventDefault()
    this.state.walkthrough.nextStep()
  }

  render () {
    const walkthroughText = this.props.stepCompleted ? `${this.props.text + this.props.completedText}` : `<p>${this.props.text}</p>`
    const htmlObject = { __html: walkthroughText}
    return (
      <div>
        <EuroRack/>
        {!this.props.completedWalkthrough
          ?(<WalkthroughText
              text={htmlObject}
              stepCompleted={this.props.stepCompleted}
              callNextStep={(e) => this.callNextStep(e)}
              showOptOutMessage={this.state.showOptOutMessage}
            />)
          : null
        }
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    state: state,
    oscillators: state.oscillators,
    text: state.walkthrough.get('text'),
    completedWalkthrough: state.walkthrough.get('completedWalkthrough'),
    completedText: state.walkthrough.get('completedText'),
    stepCompleted: state.walkthrough.get('stepCompleted')
  }
}

export default connect(
  mapStateToProps,
  {
    resetEuroRack,
    walkthroughStep,
    walkthroughStepCompleted,
    walkthroughCompleted,
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA,
    addMIDI
 }
)(WalkthroughPage)

