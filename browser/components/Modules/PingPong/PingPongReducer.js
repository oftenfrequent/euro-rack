import uuid from 'uuid'
import {fromJS} from 'immutable'

import PingPongInitialStateCreator from './PingPongInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'RESET_EURORACK' :
			return state = fromJS({})
		case 'ADD_PING_PONG' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(PingPongInitialStateCreator()))
		case 'REMOVE_PING_PONG' :
			return state.delete(action.id)
		case 'CONNECT_JACK' :
			if (action.module === 'pingPongs') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'pingPongs') {
				if (action.outputModule === 'lfos') {
					state = state.updateIn([action.inputId, 'toneComponent'], (fil) => {
										fil.frequency.value = state.getIn([action.inputId, 'frequency'])
										fil.Q.value = state.getIn([action.inputId, 'q'], action.q )
										return fil
									})
				}
				state = state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										 .setIn([action.inputId, 'input', action.inputCvName, 'attention'], false )
			}
			if (action.outputModule === 'filters') {
				state = state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
										 .setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
			}
			return state
		case 'TOGGLE_PP_TIME_FREQ' :
			const isTimeline = state.getIn([action.id, 'timelineBased']);
			return state.updateIn([action.id, 'timelineBased'], v => !v)
									.updateIn([action.id, 'toneComponent'], pp => {
										const nameType = !isTimeline ? 'timelineFrequency' : 'delayTime';
										pp.delayTime.value = state.getIn([action.id, nameType])
										return pp;
										// not possible
										// if (isTimeline) {
										// 	pp.syncFrequency()
										// }
									});
		case 'CHANGE_PP_DELAY_TIME' :
			return state.setIn([action.id, 'delayTime'], action.delayTime )
									.updateIn([action.id, 'toneComponent'], pp => {
										pp.delayTime.value = action.delayTime / 1000
										return pp
									})
		case 'CHANGE_PP_FEEDBACK' :
			return state.setIn([action.id, 'feedback'], action.amount )
									.updateIn([action.id, 'toneComponent'], pp => {
										pp.feedback.value = action.amount / 1000
										return pp
									})
		case 'CHANGE_PP_WETNESS' :
			return state.setIn([action.id, 'wetness'], action.amount)
									.updateIn([action.id, 'toneComponent'], pp => {
										window.pp = pp;
										pp.wet.value = action.amount / 1000
										return pp
									})
		// case 'CHANGE_FIL_FREQ' :
		// 	return state.setIn([action.id, 'frequency'], action.frequency )
		// 							.updateIn([action.id, 'toneComponent'], (fil) => {
		// 								if (!state.getIn([action.id, 'input', 'frequency', 'color'])) {
		// 									fil.frequency.value = action.frequency
		// 								}
		// 								return fil
		// 							})
		// case 'CHANGE_FIL_FREQ_VISUALLY' :
		// 	return state.setIn([action.id, 'frequency'], action.frequency )
		// case 'CHANGE_FIL_ROLLOFF' :
		// 	return state.setIn([action.id, 'rolloff'], action.rolloff )
		// 							.updateIn([action.id, 'toneComponent'], (fil) => {
		// 								fil.rolloff = action.rolloff
		// 								return fil
		// 							})
		// case 'CHANGE_FIL_RESONANCE' :
		// 	return state.setIn([action.id, 'q'], action.q )
		// 							.updateIn([action.id, 'toneComponent'], (fil) => {
		// 								if (!state.getIn([action.id, 'input', 'resonance', 'color'])) {
		// 									fil.Q.value = action.q
		// 								}
		// 								return fil
		// 							})
		// case 'CHANGE_FIL_RESONANCE_VISUALLY' :
		// 	return state.setIn([action.id, 'q'], action.q )
		// case 'WALKTHROUGH_STEP' :
		// 	if (action.outputModule === 'filters') {
		// 		return state.setIn([action.outputId, 'output', action.outputCvName, 'attention'], true)
		// 	} else if (action.inputModule === 'filters') {
		// 		return state.setIn([action.inputId, 'input', action.inputCvName, 'attention'], true)
		// 	} else {
		// 		return state
		// 	}
	}
	return state
}