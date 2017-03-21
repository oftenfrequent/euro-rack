import React from 'react'
import { connect } from 'react-redux'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Jack from '../../ModuleComponents/Jack'
import MidiHelper from './MidiHelperFunctions'
import {
  errorConnectingMidi,
  setMidiInputDevice,
  midiGateAttackTrigger,
  midiGateReleaseTrigger
} from './MIDIActions'


export class MIDI extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      midiHelper: new MidiHelper(props.midiGateAttackTrigger, props.midiGateReleaseTrigger),
      midiOptions: [],
      midiDevice: 'keyboard',
      attackFn: this.keydownFunction.bind(this),
      releaseFn: this.keyupFunction.bind(this)
    }
  }

  componentDidMount() { this.getMidiInputDevices() }

  keydownFunction(e) {
    const midiMessage = this.state.midiHelper.formatComputerKeyboardToMidiMessage(e, 0x09)
    if (midiMessage) {
      this.state.midiHelper.onMidiMessage(midiMessage, this.props.id)
    }
  }

  keyupFunction(e) {
    const midiMessage = this.state.midiHelper.formatComputerKeyboardToMidiMessage(e, 0x08)
    if (midiMessage) {
      this.state.midiHelper.onMidiMessage(midiMessage, this.props.id)
    }
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
            this.setState({ midiOptions: [] }, () => { throw 'No MIDI devices detected!' })
          }
        }
      }).catch((err) => {
        // console.log('err', err)
        this.props.errorConnectingMidi(this.props.id, err)
      })
  }

  setMidiDevice(e) {
    if (e.target.value === 'keyboard') {
      document.addEventListener('keydown', this.state.attackFn )
      document.addEventListener('keyup', this.state.releaseFn )
      this.props.setMidiInputDevice(this.props.id, 'keyboard')
    } else {
      document.removeEventListener('keydown', this.state.attackFn )
      document.removeEventListener('keyup', this.state.releaseFn )
      this.state.midiOptions[e.target.value].onmidimessage = (e) => this.state.midiHelper.onMidiMessage(e, this.props.id)
      this.props.setMidiInputDevice(this.props.id, this.state.midiOptions[e.target.value])
    }

  }

  connectMidiInBrowser() {
    if (window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) { return window.navigator.requestMIDIAccess() }
    else { throw 'No Web MIDI support' }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.state.attackFn )
    document.removeEventListener('keyup', this.state.releaseFn )
  }

  render(){
    const order = this.props.midi.get('flexOrder') ? this.props.midi.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='MIDI'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
      >
        <div className='display-type-container'>
          <select
            className='display-type-dropdown'
            defaultValue='init'
            onChange={(e) => this.setMidiDevice(e)}>
              <option value='init' disabled>Select MIDI Device</option>
              <option value='keyboard'>Laptop Keyboard Device</option>
              {this.state.midiOptions.map( (opt, i) =>
                <option key={opt.id} value={i}>{opt.name}</option>
              )}
          </select>
        </div>

        <button onClick={() => this.getMidiInputDevices()}>
          <div>Check For MIDI Devices</div>
          {this.props.midi.get('error')
            ? <div>({this.props.midi.get('error')})</div>
            : null
          }
        </button>

        <div className='gate-out-jack'>
          <Jack name='gate'
            color={this.props.midi.getIn(['output', 'gate1'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'gate1', 'connectThisToTriggerEnvelope', this.props.midi.getIn(['output', 'gate1']))}
          />
          <Jack name='gate'
            color={this.props.midi.getIn(['output', 'gate2'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'gate2', 'connectThisToTriggerEnvelope', this.props.midi.getIn(['output', 'gate2']))}
          />
        </div>
        <div className='cv-out-jack'>
          <Jack name='cv out'
            color={this.props.midi.getIn(['output', 'cvToFreq1'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'cvToFreq1', 'connectThisToControlFreqOfOscOrLFO', this.props.midi.getIn(['output', 'cvToFreq1']))}
          />
          <Jack name='cv out'
            color={this.props.midi.getIn(['output', 'cvToFreq2'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'cvToFreq2', 'connectThisToControlFreqOfOscOrLFO', this.props.midi.getIn(['output', 'cvToFreq2']))}
          />
          <Jack name='cv out'
            color={this.props.midi.getIn(['output', 'cvToFreq3'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'cvToFreq3', 'connectThisToControlFreqOfOscOrLFO', this.props.midi.getIn(['output', 'cvToFreq3']))}
          />
        </div>
      </ModuleContainer>
    )
          // <Jack name='gate'
          //   color={this.props.midi.getIn(['output', 'gate3'])}
          //   onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'gate3', 'connectThisToTriggerEnvelope', this.props.midi.getIn(['output', 'gate3']))}
          // />
  }
}

function mapStateToProps(state, props) {
  return {
    midi: state.midis.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    errorConnectingMidi,
    setMidiInputDevice,
    midiGateAttackTrigger,
    midiGateReleaseTrigger
  }
)(MIDI)