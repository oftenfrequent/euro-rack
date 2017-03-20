import uuid from 'uuid'
import {fromJS} from 'immutable'

import FilterInitialStateCreator from './FilterInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_FIL' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(FilterInitialStateCreator()))
		case 'REMOVE_FIL' :
			return state.delete(action.id)

		case 'CONNECT_JACK' :
			if (action.module === 'filters') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'filters') {
				if (action.outputModule === 'lfos') {
					state = state.updateIn([action.inputId, 'toneComponent'], (fil) => {
										fil.frequency.value = state.getIn([action.inputId, 'frequency'])
										fil.Q.value = state.getIn([action.inputId, 'q'], action.q )
										return fil
									})
				}
				state = state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										 .setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
			}
			if (action.outputModule === 'filters') {
				state = state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
										 .setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
			}
			return state
		case 'CHANGE_FIL_TYPE' :
			return state.setIn([action.id, 'type'], action.filterType )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										fil.type = action.filterType
										return fil
									})
		case 'CHANGE_FIL_FREQ' :
			return state.setIn([action.id, 'frequency'], action.frequency )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										if (!state.getIn([action.id, 'input', 'frequency', 'color'])) {
											fil.frequency.value = action.frequency
										}
										return fil
									})
		case 'CHANGE_FIL_FREQ_VISUALLY' :
			return state.setIn([action.id, 'frequency'], action.frequency )
		case 'CHANGE_FIL_ROLLOFF' :
			return state.setIn([action.id, 'rolloff'], action.rolloff )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										fil.rolloff = action.rolloff
										return fil
									})
		case 'CHANGE_FIL_RESONANCE' :
			return state.setIn([action.id, 'q'], action.q )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										if (!state.getIn([action.id, 'input', 'resonance', 'color'])) {
											fil.Q.value = action.q
										}
										return fil
									})
		case 'CHANGE_FIL_RESONANCE_VISUALLY' :
			return state.setIn([action.id, 'q'], action.q )
		case 'WALKTHROUGH_STEP' :
			if (action.outputModule === 'filters') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'attention'], true)
			} else if (action.inputModule === 'filters') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'attention'], true)
			} else {
				return state
			}
	}
	return state
}