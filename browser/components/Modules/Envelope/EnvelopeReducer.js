import uuid from 'uuid'
import {fromJS} from 'immutable'

import EnvelopeInitialStateCreator from './EnvelopeInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_ENV' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(EnvelopeInitialStateCreator()))
		case 'REMOVE_ENV' :
			return state.delete(action.id)
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
		case 'CHANGE_ENV_TIME_LENGTH' :
			state = state.setIn([action.id, 'selectedTimeLength'], action.value )
			return updateTimeSettingsInEnv(state, action)
		case 'CHANGE_ENV_COMP_VALUE' :
			const timeNumber =  getTimeLength(state, action)
			return state.setIn([action.id, action.component], action.value )
									.updateIn([action.id, 'toneComponent'], (env) => {
										if (action.component === 'sustain') {
											env[action.component] = action.value / 1000
										} else {
											env[action.component] = action.value / timeNumber
										}
										return env
									})
		case 'TRIGGER_ENV_ATTACK' :
			return state.updateIn([action.id, 'toneComponent'], (env) => env.triggerAttack())
		case 'TRIGGER_ENV_RELEASE' :
			return state.updateIn([action.id, 'toneComponent'], (env) => env.triggerRelease())
	}
	return state
}

const getTimeLength = (state, action) => {
	const timeName = state.getIn([action.id, 'selectedTimeLength'])
	if (timeName === 'short') { return 1000 }
	if (timeName === 'medium') { return 100 }
	if (timeName === 'long') { return 10 }
}

const updateTimeSettingsInEnv = (state, action) => {
	const updateParts = ['attack', 'decay', 'release']
	const timeNumber = getTimeLength(state, action)
	return state.updateIn([action.id, 'toneComponent'], (env) => {
								updateParts.map(n => {
									env[n] = state.getIn([action.id, n]) / timeNumber
								})
								return env
							})
}