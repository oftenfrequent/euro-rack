import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Jack from '../../ModuleComponents/Jack'
import {
  connectJack,
  disconnectJack,
  errorConnectingMidi,
  setMidiInputDevice
} from '../../EuroRackActions'

export class MIDI extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      midiOptions: [],
    }
  }

  componentDidMount() { this.getMidiInputDevices() }

  onMidiMessage(e) {
    /**
    * e.data is an array
    * e.data[0] = on (144) / off (128) / detune (224)
    * e.data[1] = midi note
    * e.data[2] = velocity || detune
    */
    // TODO: use midi velocity
    switch(e.data[0]) {
      case 144:
          console.log('NOTE HIT', this.midiToKey(e.data[1]))
      break;
      case 128:
          console.log('NOTE RELEASE')
      break;
      case 224:
          console.log('DETUNE')
      break;
    }
  }

  midiToKey(midiKey) {
      const keyArray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
      const key = keyArray[midiKey % 12]
      const oct = Math.floor(midiKey / 12)
      return key + oct.toString()
  }

  getMidiInputDevices(access) {
    this.connectMidiInBrowser()
      .then((access) => {
        if('function' === typeof access.inputs) { throw 'No Web MIDI Support' }
        else {
          if(access.inputs && access.inputs.size > 0) {
            const inputsIterator = access.inputs.values()
            let inputs = []

            // iterate through the devices
            for (let input = inputsIterator.next(); input && !input.done; input = inputsIterator.next()) {
              inputs.push(input.value)
            }
            this.setState({ midiOptions: inputs })
          } else {
            this.setState({ midiOptions: [] }, () => { throw 'No devices detected!' })
          }
        }
      }).catch((err) => {
        console.log('err', err)
        this.props.errorConnectingMidi(err)
      })
  }

  setMidiDevice(e) {
    this.state.midiOptions[e.target.value].onmidimessage = (e) => this.onMidiMessage(e)
    this.props.setMidiInputDevice(this.state.midiOptions[e.target.value])
  }

  connectMidiInBrowser() {
    if (window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) { return window.navigator.requestMIDIAccess() }
    else { throw 'No Web MIDI support' }
  }

  render(){
    return (
      <ModuleContainer name='MIDI'>
        {this.props.midi.get('error')
          ? <div>{this.props.midi.get('error')}</div>
          : null
        }
        <div className='display-type-container'>
          <select
            className='display-type-dropdown'
            onChange={(e) => this.setMidiDevice(e)}>
              <option value={null}>Select Midi Device</option>
            {this.state.midiOptions.map( (opt, i) =>
              <option key={opt.id} value={i}>{opt.name}</option>
            )}
          </select>
        </div>

        <button onClick={() => this.getMidiInputDevices()}>Check For MIDI Devices</button>

        <div className='gate-out-jack'>
          <Jack name='gate'
            color={this.props.midi.getIn(['output', 'gate'])}
            onJackClick={(e) => this.props.connectJack(e, 'midi', 'output', 'gate', 'connectThisToTriggerEnvelope', this.props.midi.getIn(['output', 'gate']))}
          />
        </div>
        <div className='cv-out-jack'>
          <Jack name='cv out'
            color={this.props.midi.getIn(['output', 'cvToFreq'])}
            onJackClick={(e) => this.props.connectJack(e, 'midi', 'output', 'cvToFreq', 'connectThisToControlFreqOfOscOrLFO', this.props.midi.getIn(['output', 'cvToFreq']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    midi: state.eurorack.get('midi')
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack,
    disconnectJack,
    errorConnectingMidi,
    setMidiInputDevice
  }
)(MIDI)