import uuid from 'uuid'
import {fromJS} from 'immutable'

import FilterInitialStateCreator from './FilterInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_FIL' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(FilterInitialStateCreator()))

		case 'CONNECT_JACK' :
			if (action.module === 'filters') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'filters') {
				state = state.setIn([action.inputId, 'input', action.inputCvName], null)
			}
			if (action.outputModule === 'filters') {
				state = state.setIn([action.outputId, 'output', action.outputCvName], null)
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
										fil.frequency.value = action.frequency
										return fil
									})
		case 'CHANGE_FIL_ROLLOFF' :
			return state.setIn([action.id, 'rolloff'], action.rolloff )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										fil.rolloff = action.rolloff
										return fil
									})
	}
	return state
}