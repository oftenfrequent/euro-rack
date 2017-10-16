import Tone from 'tone'
import uuid from 'uuid'
import {fromJS} from 'immutable'

import ConvolutionReverbInitialStateCreator from './ConvolutionReverbInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'RESET_EURORACK' :
			return state = fromJS({})
		case 'ADD_CONVOLUTION_REVERB' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(ConvolutionReverbInitialStateCreator()))
									.updateIn([newID, 'toneComponent'], convolver => {
										convolver.wet.value = 0
										return convolver
									})
		case 'REMOVE_CONVOLUTION_REVERB' :
			return state.delete(action.id)

		case 'CONNECT_JACK' :
			if (action.module === 'convolutionReverbs') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'convolutionReverbs') {
				// TODO: so much stuff!!!!
				// if (action.outputModule === 'lfos') {
				// 	state = state.updateIn([action.inputId, 'toneComponent'], (fil) => {
				// 						fil.frequency.value = state.getIn([action.inputId, 'frequency'])
				// 						fil.Q.value = state.getIn([action.inputId, 'q'], action.q )
				// 						return fil
				// 					})
				// }
				state = state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										 .setIn([action.inputId, 'input', action.inputCvName, 'attention'], false )
			}
			if (action.outputModule === 'convolutionReverbs') {
				state = state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
										 .setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
			}
			return state
		case 'CHANGE_CONVOLUTION_REVERB_IMPULSE_RESPONSE' :
			return state.updateIn([action.id, 'toneComponent'], convolver => {
				convolver.load(action.url)
				return convolver
			})
		case 'CHANGE_CONVOLUTION_REVERB_WETNESS' :
			return state.setIn([action.id, 'wetness'], action.amount)
									.updateIn([action.id, 'toneComponent'], convolver => {
										convolver.wet.value = action.amount / 100
										return convolver
									})
		// case 'DISCONNECT_JACK' :
		// 	if (action.inputModule === 'lfos') {
		// 		return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
		// 								.setIn([action.inputId, 'input', action.inputCvName, 'attention'], false )
		// 	} else if (action.outputModule === 'lfos') {
		// 		return state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
		// 								.setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
		// 	} else {
		// 		return state
		// 	}
		// case 'CHANGE_LFO_FREQ' :
		// 	const isTimeline = state.getIn([action.id, 'timelineBased'])
		// 	const nameType = isTimeline ? 'timelineFrequency' : 'frequency'
		// 	state = state.setIn([action.id, nameType], action.frequency )
		// 	return changeFreqOfOscillators(state, action.id)
		// case 'CHANGE_LFO_MIDVALUE' :
		// 	state = state.setIn([action.id, 'output', action.lfoCvName, 'midValue'], action.midValue)
		// 	return changeToneLFOParamters(action.id, action, state)

		// case 'CHANGE_LFO_PERCENT' :
		// 	state = state.setIn([action.id, 'percentChange'], action.percent )
		// 	return changeToneLFOParamters(action.id, action, state)

		// case 'TOGGLE_LFO_TIME_FREQ' :
		// 	state = state.updateIn([action.id, 'timelineBased'], v => !v)
		// 	return changeFreqOfOscillators(state, action.id)
		// case 'SYNC_LFO_FREQ' :
		// 	state.getIn([action.id, 'typeOptions']).map( type => {
		// 		state = state.updateIn([action.id, 'output', type, 'toneComponent'], (lfo) => lfo.syncFrequency() )
		// 	})
		// 	return state
		// case 'WALKTHROUGH_STEP' :
		// 	if (action.outputModule === 'lfos') {
		// 		return state.setIn([action.outputId, 'output', action.outputCvName, 'attention'], true)
		// 	} else if (action.inputModule === 'lfos') {
		// 		return state.setIn([action.inputId, 'input', action.inputCvName, 'attention'], true)
		// 	} else {
		// 		return state
		// 	}
	}
	return state
}

