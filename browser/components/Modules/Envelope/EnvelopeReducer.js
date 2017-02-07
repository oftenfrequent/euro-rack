import uuid from 'uuid'
import {fromJS} from 'immutable'

import EnvelopeInitialStateCreator from './EnvelopeInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_ENV' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(EnvelopeInitialStateCreator()))
		case 'CONNECT_JACK' :
			if (action.module === 'envelopes') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'envelopes') {
				return state.setIn([action.inputId, 'input', action.inputCvName], null)
			} else if (action.outputModule === 'envelopes') {
				return state.setIn([action.outputId, 'output', action.outputCvName], null)
			} else {
				return state
			}
		case 'CHANGE_ENV_CURVE_TYPE' :
			return state.setIn([action.id, 'attackCurve'], action.curveType )
									.setIn([action.id, 'releaseCurve'], action.curveType )
									.updateIn([action.id, 'toneComponent'], (env) => {
										env.attackCurve = action.curveType
										env.releaseCurve = action.curveType
										return env
									})
		case 'CHANGE_ENV_COMP_VALUE' :
			return state.setIn([action.id, action.component], action.value )
									.updateIn([action.id, 'toneComponent'], (env) => {
										if (action.component === 'sustain') {
											env[action.component] = action.value / 1000
										} else {
											env[action.component] = action.value / 100
										}
										return env
									})
	}
	return state
}