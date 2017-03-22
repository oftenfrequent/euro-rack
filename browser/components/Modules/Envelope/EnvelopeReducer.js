import uuid from 'uuid'
import {fromJS} from 'immutable'

import EnvelopeInitialStateCreator from './EnvelopeInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'RESET_EURORACK' :
			return state = fromJS({})
		case 'ADD_ENV' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(EnvelopeInitialStateCreator()))
		case 'REMOVE_ENV' :
			return state.delete(action.id)
		case 'CONNECT_JACK' :
			if (action.isENV) {
				state = setEnvelopeParamsOnConnection(state, action)
			}
			if (action.module === 'envelopes') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'envelopes') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										.setIn([action.inputId, 'input', action.inputCvName, 'attention'], false )
			} else if (action.outputModule === 'envelopes') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
										.setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
			} else {
				return state
			}
		case 'CHANGE_ENV_CURVE_TYPE' :
			state = state.setIn([action.id, 'attackCurve'], action.curveType )
									 .setIn([action.id, 'releaseCurve'], action.curveType )
			state.getIn([action.id, 'outputArray']).map( type => {
				state = state.updateIn([action.id, 'output', type, 'toneComponent'], (env) => {
											env.attackCurve = action.curveType
											env.releaseCurve = action.curveType
											return env
										})
			})
			return state
		case 'CHANGE_ENV_TIME_LENGTH' :
			state = state.setIn([action.id, 'selectedTimeLength'], action.value )
			return updateTimeSettingsInEnv(state, action)
		case 'CHANGE_ENV_COMP_VALUE' :
			const timeNumber =  getTimeLength(state, action)
			state = state.setIn([action.id, action.component], action.value )
			state.getIn([action.id, 'outputArray']).map( type => {
				state = state.updateIn([action.id, 'output', type, 'toneComponent'], (env) => {
											if (action.component === 'sustain') {
												env[action.component] = action.value / 1000
											} else {
												env[action.component] = action.value / timeNumber
											}
											return env
										})
			})
			return state
		case 'TRIGGER_ENV_ATTACK' :
			state.getIn([action.id, 'outputArray']).map( type => {
				state = state.updateIn([action.id, 'output', type, 'toneComponent'], (env) => env.triggerAttack())
			})
			return state
		case 'TRIGGER_ENV_RELEASE' :
			state.getIn([action.id, 'outputArray']).map( type => {
				state = state.updateIn([action.id, 'output', type, 'toneComponent'], (env) => env.triggerRelease())
			})
			return state
		case 'WALKTHROUGH_STEP' :
			if (action.outputModule === 'envelopes') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'attention'], true)
			} else if (action.inputModule === 'envelopes') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'attention'], true)
			} else {
				return state
			}
	}
	return state
}

const setEnvelopeParamsOnConnection = (state, action) => {
	const min = action.envCvName === 'inverse' ? action.maxValue : action.minValue
	const max = action.envCvName === 'inverse' ? action.minValue : action.maxValue

	return state.setIn([action.envID, 'output', action.envCvName, 'scaleMin'], min)
							.setIn([action.envID, 'output', action.envCvName, 'scaleMax'], max)
							.updateIn([action.envID, 'output', action.envCvName, 'toneComponent'], (env) => {
								env.min = min
								env.max = max
								return env
							})
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
	state.getIn([action.id, 'outputArray']).map( type => {
		state = state.updateIn([action.id, 'output', type, 'toneComponent'], (env) => {
										updateParts.map(n => {
											env[n] = state.getIn([action.id, n]) / timeNumber
										})
										return env
									})
	})
	return state
}