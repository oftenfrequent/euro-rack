import uuid from 'uuid'
import { fromJS } from 'immutable'

import OscillatorInitialState from './OscillatorInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_OSC' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(OscillatorInitialState()))

		case 'CONNECT_JACK' :
			if (action.module === 'oscillators') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'oscillators') {
				return state.setIn([action.inputId, 'input', action.inputCvName], null)
			} else if (action.outputModule === 'oscillators') {
				return state.setIn([action.outputId, 'output', action.outputCvName], null)
			} else {
				return state
			}
		case 'CHANGE_OSC_TYPE' :
			return state.setIn([action.id, 'type'], action.oscType )
									.updateIn([action.id, 'toneComponent'], (osc) => {
										osc.type = action.oscType
										return osc
									})
		case 'CHANGE_OSC_FREQ' :
			return changeFrequency(state, action.frequency, action.id)
		case 'CHANGE_OSC_MOD_FREQ' :
			return state.setIn([action.id, 'modulationFrequency'], action.frequency )
									.updateIn([action.id, 'toneComponent'], (osc) => {
										if (osc.type === 'pwm') { osc.modulationFrequency.value = action.frequency }
										return osc
									})

	}
	return state
}

const changeFrequency = (state, frequency, id) => {
	return state.setIn([id, 'frequency'], frequency )
							.updateIn([id, 'toneComponent'], (osc) => {
								osc.frequency.value = frequency
								return osc
							})
}