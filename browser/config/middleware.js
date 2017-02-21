import {fromJS} from 'immutable'
import Tone from 'tone'
import { disconnectJack } from '../components/EuroRack/EuroRackActions'
import { changeOscFreq } from '../components/Modules/Oscillator/OscillatorActions'
import { changeFilFreq } from '../components/Modules/Filter/FilterActions'
import { changeLfoMidValue, syncLfoNewBPM } from '../components/Modules/LFO/LFOActions'
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
        if (outputConnectionObj.get('module') === 'envelopes') {
          // output is an LFO
          action['isENV'] = true
          action['envID'] = outputConnectionObj.get('id')

          if (inputConnectionObj.get('cvName') === 'frequency' || inputConnectionObj.get('cvName') === 'cvFrequency') {
            const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
            console.log('input', input.toJS())
            action['minValue'] = input.get('min')
            action['maxValue'] = input.get('max')
          }
          if (inputConnectionObj.get('cvName') === 'cv1' || inputConnectionObj.get('cvName') === 'cv1') {
            const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
            console.log('input', input.toJS())
            action['minValue'] = 0
            action['maxValue'] = 1
          }
          // if (inputConnectionObj.get('cvName') === 'pwModulation') {
          //   const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          //   console.log('input', input.toJS())
          //   action['midValue'] = 0.5
          //   action['minValue'] = 0
          //   action['maxValue'] = 1
          // }
          // if (inputConnectionObj.get('cvName') === 'resonance') {
          //   const input = state[inputConnectionObj.get('module')].getIn([inputConnectionObj.get('id')])
          //   console.log('input', input.toJS())
          //   action['midValue'] = 6
          //   action['minValue'] = 0
          //   action['maxValue'] = 12
          // }
        }
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

    if (outputModule.get('cvName') === 'lfo') {
      if (inputModule.get('cvName') === 'frequency' || iinputModule.get('cvName') === 'cvFrequency') {
        const currentFrequency = state[inputModule.get('module')].getIn([inputModule.get('id'), 'frequency'])
        // dispatch action to reset frequency to current freq value of module
        if (inputModule.get('module') === 'oscillators') {
          const freqJackColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'frequency'])
          const cvFreqJackColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cvFrequency'])
          store.dispatch(changeOscFreq(currentFrequency, inputModule.get('id'), freqJackColor, cvFreqJackColor))
        }
        if (inputModule.get('module') === 'filters') {
          store.dispatch(changeFilFreq(inputModule.get('id'), currentFrequency))
        }
      }
    }
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
          const cvColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cvFrequency'])
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
          const cvColor = state.oscillators.getIn([inputModule.get('id'), 'input', 'cvFrequency'])
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

export const deleteModuleMiddleWare = store => next => action => {
  const state = store.getState()
  let moduleToRemove

  if(action.type === 'REMOVE_OSC') {
    moduleToRemove = state.oscillators.get(action.id)
    if(moduleToRemove.getIn(['input', 'frequency'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'frequency']))) }
    if(moduleToRemove.getIn(['input', 'pwModulation'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'pwModulation']))) }
    if(moduleToRemove.getIn(['input', 'cvFrequency'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'cvFrequency']))) }
    if(moduleToRemove.getIn(['output', 'sound'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sound']))) }
  }

  if(action.type === 'REMOVE_LFO') {
    moduleToRemove = state.lfos.get(action.id)
    if(moduleToRemove.getIn(['input', 'amplitude'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'amplitude']))) }
    if(moduleToRemove.getIn(['output', 'lfo'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'lfo']))) }
  }

  if(action.type === 'REMOVE_VCA') {
    moduleToRemove = state.vcas.get(action.id)
    if(moduleToRemove.getIn(['input', 'cv1'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'cv1']))) }
    if(moduleToRemove.getIn(['input', 'cv2'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'cv2']))) }
    if(moduleToRemove.getIn(['input', 'audioIn1'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'audioIn1']))) }
    if(moduleToRemove.getIn(['input', 'audioIn2'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'audioIn2']))) }
    if(moduleToRemove.getIn(['output', 'audio'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'audio']))) }
  }

  if(action.type === 'REMOVE_ENV') {
    moduleToRemove = state.envelopes.get(action.id)
    if(moduleToRemove.getIn(['input', 'frequency'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'frequency']))) }
    if(moduleToRemove.getIn(['input', 'trigger'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'trigger']))) }
    if(moduleToRemove.getIn(['output', 'envelope'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'envelope']))) }
  }

  if(action.type === 'REMOVE_FIL') {
    moduleToRemove = state.filters.get(action.id)
    if(moduleToRemove.getIn(['input', 'frequency'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'frequency']))) }
    if(moduleToRemove.getIn(['input', 'sound'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'sound']))) }
    if(moduleToRemove.getIn(['input', 'resonance'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['input', 'resonance']))) }
    if(moduleToRemove.getIn(['output', 'sound'])) { store.dispatch(disconnectJack(moduleToRemove.getIn(['output', 'sound']))) }
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

export default {
	connectJackMiddleWare,
  patchingMiddleWare,
  deleteModuleMiddleWare,
  changeBPM
}