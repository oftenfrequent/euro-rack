import uuid from 'uuid'
import {fromJS} from 'immutable'

import VCAInitialStateCreator from './VCAInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_VCA' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(VCAInitialStateCreator()))
		case 'CONNECT_JACK' :
			if (action.module === 'vcas') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'vcas') {
				state = state.setIn([action.inputId, 'input', action.inputCvName], null)
			}
			if (action.outputModule === 'vcas') {
				state = state.setIn([action.outputId, 'output', action.outputCvName], null)
			}

			return state
		case 'CHANGE_VCA_GAIN' :
			return state.setIn([action.id, 'value'], action.value )
									.updateIn([action.id, 'toneComponent'], (gain) => {
										console.log('gain', gain)
										gain.output.gain.value = action.value / 1000
										return gain
									})
	}
	return state
}