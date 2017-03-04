import Tone from 'tone'
import uuid from 'uuid'
import {fromJS} from 'immutable'

import LFOInitialStateCreator from './LFOInitialState'

export default (state = {}, action) => {
	switch(action.type) {
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
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'lfos') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
			} else if (action.outputModule === 'lfos') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
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
	}
	return state
}

const typeOptions = ['sine', 'square', 'triangle', 'sawtooth']

const changeFreqOfOscillators = (state, id) => {
	const isTimeline = state.getIn([id, 'timelineBased'])
	const nameType = isTimeline ? 'timelineFrequency' : 'frequency'
	typeOptions.map( type => {
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

	if (action.lfoCvName) {
		state = updateParamsInType(
			state,
			state.getIn([id, 'output', action.lfoCvName, 'minValue']),
			state.getIn([id, 'output', action.lfoCvName, 'maxValue']),
			state.getIn([id, 'output', action.lfoCvName, 'midValue']),
			id,
			action.lfoCvName
		)
	} else {
		typeOptions.map(type => {
			state = updateParamsInType(
				state,
				state.getIn([id, 'output', type, 'minValue']),
				state.getIn([id, 'output', type, 'maxValue']),
				state.getIn([id, 'output', type, 'midValue']),
				id,
				type
			)
		})
	}
	return state
}


const updateParamsInType = (state, min, max, mid, id, type) => {
	return state.updateIn([id, 'output', type, 'toneComponent'], (lfo) => {
									const totalDifference = max - min
									const difference = ((state.getIn([id, 'percentChange'])*totalDifference)/100)/2
									const midValue = mid
									const minValue = midValue - difference
									const maxValue = midValue + difference
									console.log('minValue', minValue)
									console.log('maxValue', maxValue)
									lfo.min = minValue < min ? min : minValue
									lfo.max = maxValue > max ? max : maxValue
									console.log('lfo', lfo)
									return lfo
								})
}