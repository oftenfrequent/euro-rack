import Tone from 'tone'
import uuid from 'uuid'
import {fromJS} from 'immutable'

import LFOInitialStateCreator from './LFOInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'RESET_EURORACK' :
			return state = fromJS({})
		case 'ADD_LFO' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(LFOInitialStateCreator()))
		case 'REMOVE_LFO' :
			return state.delete(action.id)

		case 'CONNECT_JACK' :
			if (action.isLFO) {
				state = setLFOParamsOnConnection(state, action)
			}
			if (action.module === 'lfos') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'lfos') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										.setIn([action.inputId, 'input', action.inputCvName, 'attention'], false )
			} else if (action.outputModule === 'lfos') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
										.setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )
			} else {
				return state
			}
		case 'CHANGE_LFO_FREQ' :
			const isTimeline = state.getIn([action.id, 'timelineBased'])
			const nameType = isTimeline ? 'timelineFrequency' : 'frequency'
			state = state.setIn([action.id, nameType], action.frequency )
			return changeFreqOfOscillators(state, action.id)
		case 'CHANGE_LFO_MIDVALUE' :
			state = state.setIn([action.id, 'output', action.lfoCvName, 'midValue'], action.midValue)
			return changeToneLFOParamters(action.id, action, state)

		case 'CHANGE_LFO_PERCENT' :
			state = state.setIn([action.id, 'percentChange'], action.percent )
			return changeToneLFOParamters(action.id, action, state)

		case 'TOGGLE_LFO_TIME_FREQ' :
			state = state.updateIn([action.id, 'timelineBased'], v => !v)
			return changeFreqOfOscillators(state, action.id)
		case 'SYNC_LFO_FREQ' :
			return state.updateIn([action.id, 'toneComponent'], lfo => lfo.syncFrequency())
		case 'WALKTHROUGH_STEP' :
			if (action.outputModule === 'lfos') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'attention'], true)
			} else if (action.inputModule === 'lfos') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'attention'], true)
			} else {
				return state
			}
	}
	return state
}

const changeFreqOfOscillators = (state, id) => {
	const isTimeline = state.getIn([id, 'timelineBased'])
	const nameType = isTimeline ? 'timelineFrequency' : 'frequency'
	state.getIn([id, 'typeOptions']).map( type => {
		state = state.updateIn([id, 'output', type, 'toneComponent'], (lfo) => {
								lfo.frequency.value = state.getIn([id, nameType])
								if (isTimeline) {
									lfo.syncFrequency()
								}
								return lfo
							})
	})
	return state
}

const setLFOParamsOnConnection = (state, action) => {
	state = state.setIn([action.lfoID, 'output', action.lfoCvName, 'midValue'], action.midValue)
							 .setIn([action.lfoID, 'output', action.lfoCvName, 'minValue'], action.minValue)
							 .setIn([action.lfoID, 'output', action.lfoCvName, 'maxValue'], action.maxValue)
	return changeToneLFOParamters(action.lfoID, action, state)
}

const changeToneLFOParamters = (id, action, state) => {
	const lfosToChange = action.lfoCvName ? [action.lfoCvName] : state.getIn([id, 'typeOptions'])

	lfosToChange.map( lfoType => {
		state = updateParamsInType(
				state,
				state.getIn([id, 'output', lfoType, 'minValue']),
				state.getIn([id, 'output', lfoType, 'maxValue']),
				state.getIn([id, 'output', lfoType, 'midValue']),
				id,
				lfoType
			)
	})
	return state
}


const updateParamsInType = (state, min, max, mid, id, type) => {
	return state.updateIn([id, 'output', type, 'toneComponent'], (lfo) => {
		const totalDifference = max - min
		const difference = ((state.getIn([id, 'percentChange'])*totalDifference)/100)/2
		const midValue = mid
		const minValue = midValue - difference
		const maxValue = midValue + difference
		lfo.bounds = {
			min: minValue,
			max: maxValue,
			lowBound: min,
			highBound: max
		}
		return lfo
	})
}

