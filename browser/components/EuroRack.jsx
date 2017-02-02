import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import Oscillator from './Modules/Oscillator/Oscillator'
import LFO from './Modules/LFO/LFO'
import MIDI from './Modules/MIDI/MIDIComponent'
import EnvelopeGenerator from './Modules/Envelope/Envelope'
import Filter from './Modules/Filter/Filter'
import VCA from './Modules/VCA/VCA'
import Speaker from './Modules/Speaker/Speaker'
import JackClickHelper from './Helpers/JackClickHelper'
import {
  connectJack,
  disconnectJack,
  errorConnectingJack,
} from './EuroRackActions'

import '../app.scss'

export class App extends React.Component {
  constructor(props){
    super(props);
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleJackClick(e, module, id, direction, cvName, toneComponent, currentColor) {
    JackClickHelper(e,
      this.props.patchCables.get('active'),
      this.props.patchCables.get('color'),
      this.props.patchCables.get('input'),
      this.props.patchCables.get('output'),
      module,
      id,
      direction,
      cvName,
      toneComponent,
      currentColor,
      this.props.connectJack,
      this.props.disconnectJack,
      this.props.errorConnectingJack
    )
  }

  render(){
    return (
      <div>
        <div>{this.props.error}</div>
        {Array.from(this.props.oscillators.keys()).map((name,index) =>
          <Oscillator
            id={name}
            key={index}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'oscillators', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.vcas.keys()).map((name,index) =>
          <VCA
            id={name}
            key={index}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'vcas', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.lfos.keys()).map((name,index) =>
          <LFO
            id={name}
            key={index}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'lfos', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.envelopes.keys()).map((name,index) =>
          <EnvelopeGenerator
            id={name}
            key={index}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'envelopes', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.midis.keys()).map((name,index) =>
          <MIDI
            id={name}
            key={index}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'midis', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.filters.keys()).map((name,index) =>
          <Filter
            id={name}
            key={index}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'filters', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        <Speaker
          onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'speaker', id, direction, cvName, toneComponent, currentColor)}
        />
        <button onClick={() => this.props.testing()}>TESTING STUFF</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    error: state.eurorack.getIn(['connectingCables', 'error']),
    oscillators: state.oscillators,
    lfos: state.lfos,
    envelopes: state.envelopes,
    filters: state.filters,
    vcas: state.vcas,
    midis: state.midis,
    patchCables: state.eurorack.get('patchCables')
  }
};

export default connect(
  mapStateToProps,
  {
    connectJack,
    disconnectJack,
    errorConnectingJack,
    testing
  }
)(App);


function testing () {
  return {
    type: 'TESTING_STUFF'
  }
}