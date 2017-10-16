import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import Oscillator from '../Modules/Oscillator/Oscillator'
import LFO from '../Modules/LFO/LFO'
import MIDI from '../Modules/MIDI/MIDIComponent'
import EnvelopeGenerator from '../Modules/Envelope/Envelope'
import Filter from '../Modules/Filter/Filter'
import ConvolutionReverb from '../Modules/ConvolutionReverb/ConvolutionReverb'
import VCA from '../Modules/VCA/VCA'
import Speaker from '../Modules/Speaker/Speaker'
import AddNewComponent from '../Modules/AddNew/AddNew'
import JackClickHelper from '../Helpers/JackClickHelper'
import dnd from '../Helpers/dragAndDropSetAndGet'
import MessageBanner from '../MessageBanner/MessageBanner'
import {
  connectJack,
  disconnectJack,
  errorConnectingJack,
  changeOrderOfModule,
  setModuleOrder,
  pushIdToOrder
} from './EuroRackActions'

export class EuroRack extends React.Component {
  constructor(props){
    super(props)
    this.initialOrder = [
      Array.from(props.oscillators.keys()),
      Array.from(props.lfos.keys()),
      Array.from(props.vcas.keys()),
      Array.from(props.envelopes.keys()),
      Array.from(props.filters.keys()),
      Array.from(props.convolutionReverbs.keys()),
      Array.from(props.midis.keys())
    ]
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

  componentWillUpdate(nextProps, nextState) {
    const idList = [].concat.apply([], [
      Array.from(nextProps.oscillators.keys()),
      Array.from(nextProps.lfos.keys()),
      Array.from(nextProps.vcas.keys()),
      Array.from(nextProps.envelopes.keys()),
      Array.from(nextProps.filters.keys()),
      Array.from(nextProps.convolutionReverbs.keys()),
      Array.from(nextProps.midis.keys())
    ])

    idList.map( id => {
      if (nextProps.order.indexOf(id) === -1) {
        this.props.pushIdToOrder(id)
      }
    })
  }

  componentWillMount() {
    this.props.setModuleOrder([].concat.apply([], this.initialOrder))
  }

  changeOrder(newIndex) {
    const oldIndex = this.props.order.indexOf(dnd.getActiveModuleId())
    if (oldIndex !== newIndex)  {
      let newArray = this.props.order
      //cut index out
      const newModuleId = newArray.splice(oldIndex, 1)[0]
      //insert at index
      newArray.splice(newIndex, 0, newModuleId)
      this.props.setModuleOrder(newArray)
    }
  }



  render(){
    return (
      <div>
      <MessageBanner/>
      <div className='euro-rack-container'>
        {Array.from(this.props.oscillators.keys()).map((name,index) =>
          <Oscillator
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'oscillators', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.lfos.keys()).map((name,index) =>
          <LFO
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'lfos', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.vcas.keys()).map((name,index) =>
          <VCA
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'vcas', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.envelopes.keys()).map((name,index) =>
          <EnvelopeGenerator
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'envelopes', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.filters.keys()).map((name,index) =>
          <Filter
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'filters', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.convolutionReverbs.keys()).map((name,index) =>
          <ConvolutionReverb
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'convolutionReverbs', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        {Array.from(this.props.midis.keys()).map((name,index) =>
          <MIDI
            id={name}
            key={index}
            order={this.props.order.indexOf(name)}
            changeOrder={(n) => this.changeOrder(n)}
            onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'midis', id, direction, cvName, toneComponent, currentColor)}
          />
        )}
        <Speaker
          order={9999}
          changeOrder={(n) => this.changeOrder(n)}
          onJackClick={(e, id, direction, cvName, toneComponent, currentColor) => this.handleJackClick(e, 'speaker', id, direction, cvName, toneComponent, currentColor)}
        />
        {this.props.addModules
         ? <AddNewComponent/>
         : null
        }
      </div>
      </div>
    )
      // <button onClick={() => this.props.testing()}>TESTING STUFF</button>
  }
};

function mapStateToProps(state) {
  return {
    error: state.eurorack.getIn(['patchCables', 'error']),
    oscillators: state.oscillators,
    lfos: state.lfos,
    envelopes: state.envelopes,
    filters: state.filters,
    convolutionReverbs: state.convolutionReverbs,
    vcas: state.vcas,
    midis: state.midis,
    patchCables: state.eurorack.get('patchCables'),
    order: state.eurorack.get('order').toJS(),
    addModules: state.eurorack.get('addModules')
  }
};

export default connect(
  mapStateToProps,
  {
    connectJack,
    disconnectJack,
    errorConnectingJack,
    changeOrderOfModule,
    setModuleOrder,
    pushIdToOrder,
    testing
  }
)(EuroRack);


function testing () {
  return {
    type: 'TESTING_STUFF'
  }
}