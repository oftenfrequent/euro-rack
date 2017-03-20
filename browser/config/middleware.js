import {fromJS} from 'immutable'
import Tone from 'tone'
import { disconnectJack } from '../components/EuroRack/EuroRackActions'
import { changeOscFreq } from '../components/Modules/Oscillator/OscillatorActions'
import { changeFilFreq } from '../components/Modules/Filter/FilterActions'
import { changeLfoMidValue, syncLfoNewBPM } from '../components/Modules/LFO/LFOActions'
import { triggerAttack, triggerRelease } from '../components/Modules/Envelope/EnvelopeActions'
import { changeVCAGain } from '../components/Modules/VCA/VCAActions'

export const connectJackMiddleWare = store => next => action => {
  const state = store.getState()

  if (action.type === 'CONNECT_JACK') {
    if (action.direction === 'input' && action.toneObject === 'ALL_OSC_TYPES') {
      if (action.cvName === 'frequency' || action.cvName === 'cvFrequency') {
        let toneObjArray = []
        state.oscillators.getIn([action.id, 'typesArray']).map( type => {
          toneObjArray.push(state.oscillators.getIn([action.id, 'output', type, 'toneComponent']).frequency)
        })
        action.toneObject = toneObjArray
      }
    }
    if (action.direction === 'input' && action.toneObject === 'ALL_LFO_AMPLITUDES') {
      if (action.cvName === 'amplitude') {
        let toneObjArray = []
        state.lfos.getIn([action.id, 'typeOptions']).map( type => {
          toneObjArray.push(state.lfos.getIn([action.id, 'output', type, 'toneComponent']).amplitude)
        })
        action.toneObject = toneObjArray
      }
    }

    if (state.eurorack.getIn(['patchCables', 'active'])) {
      const outputConnectionObj = state.eurorack.getIn(['patchCables', 'output']) ? state.eurorack.getIn(['patchCables', 'output']) : fromJS(action)
      const inputConnectionObj = state.eurorack.getIn(['patchCables', 'input']) ? state.eurorack.getIn(['patchCables', 'input']) : fromJS(action)

      if (outputConnectionObj.get('module') === 'lfos') {
        // output is an LFO
        action['isLFO'] = true
        action['lfoID'] = outputConnectionObj.get('id')
        action['lfoCvName'] = outputConnectionObj.get('cvName')

        if (inputConnectionObj.get('cvName') === 'frequency' || inputConnectionObj.get('cvName') === 'cvFrequency') {
          const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          action['midValue'] = input.get('frequency')
          action['minValue'] = input.get('min')
          action['maxValue'] = input.get('max')
        }
        if (inputConnectionObj.get('cvName') === 'pwModulation') {
          const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          action['midValue'] = 0.5
          action['minValue'] = 0
          action['maxValue'] = 1
        }
        if (inputConnectionObj.get('cvName') === 'resonance') {
          const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          action['midValue'] = input.get('q')
          action['minValue'] = input.get('minQ')
          action['maxValue'] = input.get('maxQ')
        }
        if (inputConnectionObj.get('cvName') === 'cv1') {
          action['midValue'] = (state.vcas.getIn([inputConnectionObj.get('id'), 'outputValue']) / 1000 )
          action['minValue'] = 0
          action['maxValue'] = 1
        }

      } else {
        action['isLFO'] = false
        if (outputConnectionObj.get('module') === 'envelopes') {
          // output is an LFO
          action['isENV'] = true
          action['envID'] = outputConnectionObj.get('id')
          action['envCvName'] = outputConnectionObj.get('cvName')

          if (inputConnectionObj.get('cvName') === 'frequency' || inputConnectionObj.get('cvName') === 'cvFrequency') {
            const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
            action['minValue'] = input.get('min')
            action['maxValue'] = input.get('max')
          }
          if (inputConnectionObj.get('cvName') === 'cv1' || inputConnectionObj.get('cvName') === 'cv1') {
            action['minValue'] = 0
            action['maxValue'] = 1
          }
          if (inputConnectionObj.get('cvName') === 'amplitude') {
            action['minValue'] = 0
            action['maxValue'] = 1
          }
          if (inputConnectionObj.get('cvName') === 'resonance') {
            action['minValue'] = 0
            action['maxValue'] = 12
          }
        }
      }
    }
  } else if (action.type === 'DISCONNECT_JACK') {
    let inputModule  = state.eurorack.getIn(['patchCables', 'connections', action.color, 'input'])
    let outputModule = state.eurorack.getIn(['patchCables', 'connections', action.color, 'output'])

    if (!inputModule && !outputModule) {
      action['singleJack'] = true
      inputModule = state.eurorack.getIn(['patchCables', 'input'])
      outputModule = state.eurorack.getIn(['patchCables', 'output'])
    }

    if (inputModule) {
      action['inputModule']     = inputModule.get('module')
      action['inputId']         = inputModule.get('id')
      action['inputToneObject'] = inputModule.get('toneObject')
      action['inputCvName']     = inputModule.get('cvName')
    }

    if (outputModule) {
      action['outputModule']      = outputModule.get('module')
      action['outputId']          = outputModule.get('id')
      action['outputToneObject']  = outputModule.get('toneObject')
      action['outputCvName']      = outputModule.get('cvName')


      if (outputModule.get('cvName') === 'lfo') {
        if (inputModule.get('cvName') === 'frequency' || inputModule.get('cvName') === 'cvFrequency') {
          const currentFrequency = state[inputModule.get('module')].getIn([inputModule.get('id'), 'frequency'])
          // dispatch action to reset frequency to current freq value of module
          if (inputModule.get('module') === 'oscillators') {
            store.dispatch(changeOscFreq(currentFrequency, inputModule.get('id')))
          }
          if (inputModule.get('module') === 'filters') {
            store.dispatch(changeFilFreq(inputModule.get('id'), currentFrequency))
          }
        }
        else if (inputModule.get('cvName') === 'cv1') {
          const currentGain = state.vcas.getIn([inputModule.get('id'), 'outputValue'])
          // dispatch action to reset gain to current value of module
          store.dispatch(changeVCAGain(currentGain, inputModule.get('id'), 'outputValue'))
        }
      }
    }
  }

  return next(action)
}

export const patchingMiddleWare = store => next => action => {
  const state = store.getState()
  const freqColor1 = state.midis.getIn([action.id, 'output', 'cvToFreq1'])
  const freqColor2 = state.midis.getIn([action.id, 'output', 'cvToFreq2'])
  const freqColor3 = state.midis.getIn([action.id, 'output', 'cvToFreq3'])
  const gateColor1 = state.midis.getIn([action.id, 'output', 'gate1'])
  const gateColor2 = state.midis.getIn([action.id, 'output', 'gate2'])
  const gateColor3 = state.midis.getIn([action.id, 'output', 'gate3'])
  const gateArray = [gateColor1, gateColor2, gateColor3]
  if (action.type === 'MIDI_GATE_ATTACK_TRIGGER') {
    // use color of patch to find what freqcv is routed to
    [freqColor1, freqColor2, freqColor3].map( color => {
      if(color) {
        const inputModule = state.eurorack.getIn(['patchCables', 'connections', color, 'input'])
        if (inputModule.get('module') === 'oscillators') {
          if (inputModule.get('cvName') === 'frequency') {
            const cvColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cvFrequency'])
            // call appropriate fn
            store.dispatch(changeOscFreq(Tone.Frequency(action.freq).toFrequency(), inputModule.get('id'))) //, color, cvColor))
          }
        }
        if (inputModule.get('module') === 'filters') {
          if (inputModule.get('cvName') === 'frequency') {
            store.dispatch(changeFilFreq(inputModule.get('id'), Tone.Frequency(action.freq).toFrequency()))
          }
        }
      }
    })

    gateArray.map( color => {
      if (color) {
        const gateInputModule = state.eurorack.getIn(['patchCables', 'connections', color, 'input'])

        if (gateInputModule.get('module') === 'envelopes') {
          store.dispatch(triggerAttack(gateInputModule.get('id')))
        }
        // LFO?????? TRIGGER START?
        // if (gateInputModule.get('module') === 'envelopes') {
        //   store.dispatch(triggerAttack(gateInputModule.get('id')))
        // }
      }
    })

  } else if (action.type === 'MIDI_GATE_RELEASE_TRIGGER') {
    gateArray.map( color => {
      if (color) {
        const gateInputModule = state.eurorack.getIn(['patchCables', 'connections', color, 'input'])

        if (gateInputModule.get('module') === 'envelopes') {
          store.dispatch(triggerRelease(gateInputModule.get('id')))
        }
        // LFO?????? TRIGGER START?
        // if (gateInputModule.get('module') === 'envelopes') {
        //   store.dispatch(triggerAttack(gateInputModule.get('id')))
        // }
      }
    })
  } else if (action.type === 'CHANGE_OSC_FREQ') {
    const freqInputColor = state.oscillators.getIn([action.id, 'input', 'frequency', 'color'])
    const fqCVInputColor = state.oscillators.getIn([action.id, 'input', 'cvFrequency', 'color'])
    const outputFreqModule = freqInputColor ? state.eurorack.getIn(['patchCables', 'connections', freqInputColor, 'output']) : false
    const outputFqCVModule = fqCVInputColor ? state.eurorack.getIn(['patchCables', 'connections', fqCVInputColor, 'output']) : false

    action['hasLFOAttached'] = false
    if (outputFreqModule && outputFreqModule.get('module') === 'lfos') {
      action['hasLFOAttached'] = true
      store.dispatch(changeLfoMidValue(outputFreqModule.get('id'), action.frequency, outputFreqModule.get('cvName')))
      return next(action)
    } else if (outputFqCVModule && outputFqCVModule.get('module') === 'lfos') {
      action['hasLFOAttached'] = true
      store.dispatch(changeLfoMidValue(outputFqCVModule.get('id'), action.frequency, outputFqCVModule.get('cvName')))
      return next(action)
    }
  } else if (action.type === 'CHANGE_FIL_FREQ') {
    const freqInputColor = state.filters.getIn([action.id, 'input', 'frequency', 'color'])
    if (freqInputColor) {
      const outputModule = state.eurorack.getIn(['patchCables', 'connections', freqInputColor, 'output'])
      if (outputModule.get('module') === 'lfos') {
        store.dispatch(changeLfoMidValue(outputModule.get('id'), action.frequency, outputModule.get('cvName')))
        return next(action)
      }
    }
  } else if (action.type === 'CHANGE_FIL_RESONANCE') {
    const freqInputColor = state.filters.getIn([action.id, 'input', 'resonance', 'color'])
    if (freqInputColor) {
      const outputModule = state.eurorack.getIn(['patchCables', 'connections', freqInputColor, 'output'])
      if (outputModule.get('module') === 'lfos') {
        store.dispatch(changeLfoMidValue(outputModule.get('id'), action.q, outputModule.get('cvName')))
        return next(action)
      }
    }
  } else if (action.type === 'CHANGE_VCA_GAIN') {
    const gainCVColor = state.vcas.getIn([action.id, 'input', 'cv1', 'color'])
    if (gainCVColor && action.gainType === 'outputValue') {
      const outputModule = state.eurorack.getIn(['patchCables', 'connections', gainCVColor, 'output'])
      if (outputModule.get('module') === 'lfos') {
        store.dispatch(changeLfoMidValue(outputModule.get('id'), (action.value / 1000), outputModule.get('cvName')))
        return next(action)
      }
    }
  }

  return next(action)
}

export const deleteModuleMiddleWare = store => next => action => {
  const state = store.getState()
  let moduleToRemove

  if(action.type === 'REMOVE_OSC') {
    moduleToRemove = state.oscillators.get(action.id)
    if(moduleToRemove.getIn(['input', 'frequency', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'frequency', 'color']))) }
    if(moduleToRemove.getIn(['input', 'pwModulation', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'pwModulation', 'color']))) }
    if(moduleToRemove.getIn(['input', 'cvFrequency', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'cvFrequency', 'color']))) }
    if(moduleToRemove.getIn(['output', 'sine', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sine', 'color']))) }
    if(moduleToRemove.getIn(['output', 'triangle', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'triangle', 'color']))) }
    if(moduleToRemove.getIn(['output', 'sawtooth', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sawtooth', 'color']))) }
    if(moduleToRemove.getIn(['output', 'pwm', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'pwm', 'color']))) }
  }

  if(action.type === 'REMOVE_LFO') {
    moduleToRemove = state.lfos.get(action.id)
    if(moduleToRemove.getIn(['input', 'amplitude', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'amplitude', 'color']))) }
    if(moduleToRemove.getIn(['output', 'sine', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sine', 'color']))) }
    if(moduleToRemove.getIn(['output', 'triangle', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'triangle', 'color']))) }
    if(moduleToRemove.getIn(['output', 'sawtooth', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sawtooth', 'color']))) }
    if(moduleToRemove.getIn(['output', 'pwm', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'pwm', 'color']))) }
  }

  if(action.type === 'REMOVE_VCA') {
    moduleToRemove = state.vcas.get(action.id)
    if(moduleToRemove.getIn(['input', 'cv1', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'cv1', 'color']))) }
    if(moduleToRemove.getIn(['input', 'cv2', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'cv2', 'color']))) }
    if(moduleToRemove.getIn(['input', 'audioIn1', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'audioIn1', 'color']))) }
    if(moduleToRemove.getIn(['input', 'audioIn2', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'audioIn2', 'color']))) }
    if(moduleToRemove.getIn(['output', 'audio', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'audio', 'color']))) }
  }

  if(action.type === 'REMOVE_ENV') {
    moduleToRemove = state.envelopes.get(action.id)
    if(moduleToRemove.getIn(['input', 'frequency'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'frequency']))) }
    if(moduleToRemove.getIn(['input', 'trigger'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'trigger']))) }
    if(moduleToRemove.getIn(['output', 'output1', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'output1', 'color']))) }
    if(moduleToRemove.getIn(['output', 'output2', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'output2', 'color']))) }
    if(moduleToRemove.getIn(['output', 'inverse', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'inverse', 'color']))) }
  }

  if(action.type === 'REMOVE_FIL') {
    moduleToRemove = state.filters.get(action.id)
    if(moduleToRemove.getIn(['input', 'frequency', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'frequency', 'color']))) }
    if(moduleToRemove.getIn(['input', 'sound', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'sound', 'color']))) }
    if(moduleToRemove.getIn(['input', 'resonance', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'resonance', 'color']))) }
    if(moduleToRemove.getIn(['output', 'sound', 'color'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sound', 'color']))) }
  }

  return next(action)
}

export const changeBPM = store => next => action => {
  const state = store.getState()
  if (action.type === 'CHANGE_BPM') {
    Array.from(state.lfos.keys()).map((id) => {
      if (state.lfos.getIn([id, 'timelineBased'])) {
        store.dispatch(syncLfoNewBPM(id))
      }
    })
  }
  return next(action)
}

export const walkthroughMiddleware = store => next => action => {
  const state = store.getState()
  if (action.type === 'WALKTHROUGH_STEP') {
    if (!action.outputId) {
      action.outputId = Array.from(state[action.outputModule].keys())[0]
    }
    if (!action.inputId) {
      action.inputId = Array.from(state[action.inputModule].keys())[0]
    }
  }
  return next(action)
}

// export default {
// 	connectJackMiddleWare,
//   patchingMiddleWare,
//   deleteModuleMiddleWare,
//   changeBPM,
//   walkthroughMiddleware
// }
