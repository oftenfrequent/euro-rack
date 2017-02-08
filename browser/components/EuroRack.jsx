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
import AddNewComponent from './Modules/AddNew/AddNew'
import dnd from './Helpers/dragAndDropSetAndGet'
import {
  connectJack,
  disconnectJack,
  errorConnectingJack,
  changeOrderOfModule
} from './EuroRackActions'

import '../app.scss'

export class App extends React.Component {
  constructor(props){
    super(props)
    const order = [
      Array.from(props.oscillators.keys()),
      Array.from(props.lfos.keys()),
      Array.from(props.vcas.keys()),
      Array.from(props.envelopes.keys()),
      Array.from(props.filters.keys()),
      Array.from(props.midis.keys())
    ]
    this.state = {
      order: [].concat.apply([], order)
    }
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleJackClick(e, module, id, direction, cvName, toneComponent, currentColor) {
    console.log('JACKCLICK id', id)
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

  changeOrder(newIndex) {
    const oldIndex = this.state.order.indexOf(dnd.getActiveModuleId())
    if (oldIndex !== newIndex)  {
      let newArray = this.state.order
      const newModuleId = newArray.splice(oldIndex, 1)[0]
      newArray.splice(newIndex, 0, newModuleId)
      this.setState({ order: newArray })

    }
  }

  render(){
    console.log('state.order', this.state.order)
    let i = 0
    return (
      <div className='euro-rack-container'>
        <div>{this.props.error}</div>
        {Array.from(this.props.oscillators.keys()).map((name,index) =>
          <Oscillator
            id={name}
            key={index}
            order={this.state.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'oscillators', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.lfos.keys()).map((name,index) =>
          <LFO
            id={name}
            key={index}
            order={this.state.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'lfos', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.vcas.keys()).map((name,index) =>
          <VCA
            id={name}
            key={index}
            order={this.state.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'vcas', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.envelopes.keys()).map((name,index) =>
          <EnvelopeGenerator
            id={name}
            key={index}
            order={this.state.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'envelopes', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.filters.keys()).map((name,index) =>
          <Filter
            id={name}
            key={index}
            order={this.state.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'filters', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.midis.keys()).map((name,index) =>
          <MIDI
            id={name}
            key={index}
            order={this.state.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'midis', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        <Speaker
          order={9999}
          changeOrder={(n) => this.changeOrder(n)}
          onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'speaker', id, direction, cvName, toneComponent, currentColor)}
        />
        <AddNewComponent/>
      </div>
    )
        // <button onClick={() => this.props.testing()}>TESTING STUFF</button>
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
    changeOrderOfModule,
    testing
  }
)(App);


function testing () {
  return {
    type: 'TESTING_STUFF'
  }
}