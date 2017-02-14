import {fromJS} from 'immutable'
import Tone from 'tone'
import { changeOscFreq } from '../components/Modules/Oscillator/OscillatorActions'
import { changeLfoMidValue } from '../components/Modules/LFO/LFOActions'
import { triggerAttack, triggerRelease } from '../components/Modules/Envelope/EnvelopeActions'


export const connectJackMiddleWare = store => next => action => {
  const state = store.getState()

  if (action.type === 'CONNECT_JACK') {
    if (state.eurorack.getIn(['patchCables', 'active'])) {
      const outputConnectionObj = state.eurorack.getIn(['patchCables', 'output']) ? state.eurorack.getIn(['patchCables', 'output']) : fromJS(action)
      const inputConnectionObj = state.eurorack.getIn(['patchCables', 'input']) ? state.eurorack.getIn(['patchCables', 'input']) : fromJS(action)
      if (outputConnectionObj.get('module') === 'lfos') {
        // output is an LFO
        action['isLFO'] = true
        action['lfoID'] = outputConnectionObj.get('id')

        if (inputConnectionObj.get('cvName') === 'frequency' || inputConnectionObj.get('cvName') === 'cvFrequency') {
          const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          console.log('input', input.toJS())
          action['midValue'] = input.get('toneComponent').frequency.value
          action['minValue'] = input.get('min')
          action['maxValue'] = input.get('max')
        }
        if (inputConnectionObj.get('cvName') === 'pwModulation') {
          const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          console.log('input', input.toJS())
          action['midValue'] = 0.5
          action['minValue'] = 0
          action['maxValue'] = 1
        }
        if (inputConnectionObj.get('cvName') === 'resonance') {
          const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          console.log('input', input.toJS())
          action['midValue'] = 6
          action['minValue'] = 0
          action['maxValue'] = 12
        }

      } else {
        action['isLFO'] = false
      }
    }
  } else if (action.type === 'DISCONNECT_JACK') {
    const inputModule  = state.eurorack.getIn(['patchCables', 'connections', action.color, 'input'])
    const outputModule = state.eurorack.getIn(['patchCables', 'connections', action.color, 'output'])
    console.log('inputModule', inputModule.toJS())
    console.log('outputModule', outputModule.toJS())
    action['inputModule']     = inputModule.get('module')
    action['inputId']         = inputModule.get('id')
    action['inputToneObject'] = inputModule.get('toneObject')
    action['inputCvName']     = inputModule.get('cvName')

    action['outputModule']      = outputModule.get('module')
    action['outputId']          = outputModule.get('id')
    action['outputToneObject']  = outputModule.get('toneObject')
    action['outputCvName']      = outputModule.get('cvName')

  }

  return next(action)
}


export const patchingMiddleWare = store => next => action => {
  const state = store.getState()
  if (action.type === 'MIDI_GATE_ATTACK_TRIGGER') {
    // use color of patch to find what freqcv is routed to
    if (action.freqColor1) {
      const inputModule = state.eurorack.getIn(['patchCables', 'connections', action.freqColor1, 'input'])

      if (inputModule.get('module') === 'oscillators') {
        if (inputModule.get('cvName') === 'frequency') {
          const freqColor1 = state.oscillators.getIn([inputModule.get('id'), 'input', 'frequency'])
      console.log('freqColor1', freqColor1)
          const cvColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cv'])
          // call appropriate fn
          store.dispatch(changeOscFreq(Tone.Frequency(action.freq).toFrequency(), inputModule.get('id'), freqColor1, cvColor))
        }
      }
    }
    if (action.freqColor2) {
      const inputModule = state.eurorack.getIn(['patchCables', 'connections', action.freqColor2, 'input'])

      if (inputModule.get('module') === 'oscillators') {
        if (inputModule.get('cvName') === 'frequency') {
          const freqColor2 = state.oscillators.getIn([inputModule.get('id'), 'input', 'frequency'])
      console.log('freqColor2', freqColor2)
          const cvColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cv'])
          // call appropriate fn
          store.dispatch(changeOscFreq(Tone.Frequency(action.freq).toFrequency(), inputModule.get('id'), freqColor2, cvColor))
        }
      }
    }
    if (action.gateColor1) {
      const gateInputModule = state.eurorack.getIn(['patchCables', 'connections', action.gateColor1, 'input'])

      if (gateInputModule.get('module') === 'envelopes') {
        store.dispatch(triggerAttack(gateInputModule.get('id')))
      }
      // LFO?????? TRIGGER START?
      // if (gateInputModule.get('module') === 'envelopes') {
      //   store.dispatch(triggerAttack(gateInputModule.get('id')))
      // }
    }
    if (action.gateColor2) {
      const gateInputModule = state.eurorack.getIn(['patchCables', 'connections', action.gateColor2, 'input'])

      if (gateInputModule.get('module') === 'envelopes') {
        store.dispatch(triggerAttack(gateInputModule.get('id')))
      }
      // LFO?????? TRIGGER START?
      // if (gateInputModule.get('module') === 'envelopes') {
      //   store.dispatch(triggerAttack(gateInputModule.get('id')))
      // }
    }
  } else if (action.type === 'MIDI_GATE_RELEASE_TRIGGER') {
    if (action.gateColor1) {
      const gateInputModule1 = state.eurorack.getIn(['patchCables', 'connections', action.gateColor1, 'input'])

      if (gateInputModule1.get('module') === 'envelopes') {
        store.dispatch(triggerRelease(gateInputModule1.get('id')))
      }
    }
    if (action.gateColor2) {
      const gateInputModule2 = state.eurorack.getIn(['patchCables', 'connections', action.gateColor2, 'input'])

      if (gateInputModule2.get('module') === 'envelopes') {
        store.dispatch(triggerRelease(gateInputModule2.get('id')))
      }
    }

  } else if (action.type === 'CHANGE_OSC_FREQ') {
    if (action.freqInputColor) {
      const outputModule = state.eurorack.getIn(['patchCables', 'connections', action.freqInputColor, 'output'])
      if (outputModule.get('module') === 'lfos') {
        store.dispatch(changeLfoMidValue(outputModule.get('id'), action.frequency))
      }
    }
  }

  return next(action)
}

export default {
	connectJackMiddleWare,
  patchingMiddleWare
}



// possible pairing
// -------TO BE DONE------------
// midi -> OSC.freq
// ----------DONE---------------
// lfo -> OSC.frequency
// lfo -> OSC.pwModulation