

export const connectJackMiddleWare = store => next => action => {
  const state = store.getState()
  if (action.type === 'CONNECT_JACK') {
    if ((action.module === 'lfos' ||
        (state.eurorack.getIn(['patchCables', 'output']) && state.eurorack.getIn(['patchCables', 'output', 'module']) === 'lfos')
      ) && state.eurorack.getIn(['patchCables', 'active']) //make sure making actual connection
    ) {
      const input = state[action.module].getIn([action.id])
      const lfoID =  state.eurorack.getIn(['patchCables', 'output']) ? state.eurorack.getIn(['patchCables', 'output', 'id']) : action.id
      // const inputToneComponent = input.get('toneComponent')

      // console.log('inputToneComponent', inputToneComponent)
      // const modulatedValue = inputToneComponent.value
      // console.log('modulatedValue', modulatedValue)
      action['midValue'] = input.get('toneComponent').frequency.value
      action['minValue'] = input.get('min')
      action['maxValue'] = input.get('max')
      action['isLFO'] = true
      action['lfoID'] = lfoID

    } else {
      action['isLFO'] = false
    }
  }

  return next(action)
}

import Tone from 'tone'
import { changeOscFreq } from '../components/Modules/Oscillator/OscillatorActions'
import { changeLfoMidValue } from '../components/Modules/LFO/LFOActions'

export const patchingMiddleWare = store => next => action => {
  const state = store.getState()
  if (action.type === 'MIDI_GATE_ATTACK_TRIGGER') {
    // use color of patch to find what freqcv is routed to
    if (action.freqColor) {
      const inputModule = state.eurorack.getIn(['patchCables', 'connections', action.freqColor, 'input'])

      if (inputModule.get('module') === 'oscillators') {
        if (inputModule.get('cvName') === 'frequency') {
          const freqColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'frequency'])
      console.log('freqColor', freqColor)
          const cvColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cv'])
          // call appropriate fn
          store.dispatch(changeOscFreq(Tone.Frequency(action.freq).toFrequency(), inputModule.get('id'), freqColor, cvColor))
        }
      }
    }
  } else if (action.type === 'CHANGE_OSC_FREQ') {
    if (action.freqInputColor) {
      const outputModule = state.eurorack.getIn(['patchCables', 'connections', action.freqInputColor, 'output'])
      console.log('action.freqColor', action.freqInputColor)
      console.log('outputModule', outputModule)
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
// midi -> OSC.freq
// lfo -> OSC.pwModulation
  //min: 0 max: 1 -- default
// lfo -> OSC.frequency
  //min: 0 max: 1 -- default