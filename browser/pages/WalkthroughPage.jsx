import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EuroRack from '../components/EuroRack/EuroRack'

import { addOscillator } from '../components/Modules/Oscillator/OscillatorActions'
import { addLFO } from '../components/Modules/LFO/LFOActions'
import { addEnvelope } from '../components/Modules/Envelope/EnvelopeActions'
import { addFilter } from '../components/Modules/Filter/FilterActions'
import { addVCA } from '../components/Modules/VCA/VCAActions'

import { initialIntroduction } from '../components/Walkthrough/WalkthroughActions'

export class WalkthroughPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    this.props.addOscillator()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.oscillators && !prevProps.oscillators.size) {
      const osc = Array.from(this.props.oscillators.keys())[0]
      console.log('this.props.oscillators', osc)
      this.props.initialIntroduction(osc)
    }
  }

  render () {
    return (
      <EuroRack AddModules={false} />
    )
  }
}

function mapStateToProps (state, props) {
  return {
    // auth: state.auth
    oscillators: state.oscillators,
  }
}

export default connect(
  mapStateToProps,
  {
    initialIntroduction,
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA
 }
)(WalkthroughPage)

