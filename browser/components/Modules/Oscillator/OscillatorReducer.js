import uuid from 'uuid'
import { fromJS } from 'immutable'

import OscillatorInitialState from './OscillatorInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_OSC' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(OscillatorInitialState()))
		case 'REMOVE_OSC' :
			return state.delete(action.id)

		case 'CONNECT_JACK' :
			if (action.module === 'oscillators') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'oscillators') {
				if (action.outputModule === 'lfos' || action.outputModule === 'envelopes') {
					state = changeFrequency(state, action.inputId, state.getIn([action.inputId, 'frequency']))
				}
				return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
			} else if (action.outputModule === 'oscillators') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
			} else {
				return state
			}
		case 'CHANGE_OSC_FREQ' :
			state = state.setIn([action.id, 'frequency'], action.frequency )
			if (!action.hasLFOAttached) {
				return changeFrequency(state, action.id, action.frequency)
			}
		case 'CHANGE_OSC_MOD_FREQ' :
			return state.setIn([action.id, 'output', 'pwm', 'modulationFrequency'], action.frequency )
									.updateIn([action.id, 'output', 'pwm', 'toneComponent'], (osc) => {
										osc.modulationFrequency.value = action.frequency
										console.log('osc', osc.modulationFrequency.value)
										return osc
									})

	}
	return state
}

const typesArray = ['sine', 'triangle', 'sawtooth', 'pwm']

const changeFrequency = (state, id, freq) => {
	typesArray.map(type => {
		state = state.updateIn([id, 'output', type, 'toneComponent'], osc => {
			osc.frequency.value = freq
			return osc
		})
	})
	return state
}