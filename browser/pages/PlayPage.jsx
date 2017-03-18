import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EuroRack from '../components/EuroRack/EuroRack'

import { addOscillator } from '../components/Modules/Oscillator/OscillatorActions'
import { addLFO } from '../components/Modules/LFO/LFOActions'
import { addEnvelope } from '../components/Modules/Envelope/EnvelopeActions'
import { addFilter } from '../components/Modules/Filter/FilterActions'
import { addVCA } from '../components/Modules/VCA/VCAActions'

export class PlayPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    this.props.addOscillator()
    this.props.addLFO()
    this.props.addEnvelope()
    this.props.addFilter()
    this.props.addVCA()
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
  }
}

export default connect(
  mapStateToProps,
  {
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA
 }
)(PlayPage)

