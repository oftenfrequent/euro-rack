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
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'lfos') {
				return state.setIn([action.inputId, 'input', action.inputCvName], null)
			} else if (action.outputModule === 'lfos') {
				return state.setIn([action.outputId, 'output', action.outputCvName], null)
			} else {
				return state
			}
		case 'CHANGE_LFO_TYPE' :
			return state.setIn([action.id, 'type'], action.oscType )
									.updateIn([action.id, 'toneComponent'], (lfo) => {
										lfo.type = action.oscType
										return lfo
									})
		case 'CHANGE_LFO_FREQ' :
			const isTimeline = state.getIn([action.id, 'timelineBased'])
			const nameType = isTimeline ? 'timelineFrequency' : 'frequency'
			return state.setIn([action.id, nameType], action.frequency )
									.updateIn([action.id, 'toneComponent'], (lfo) => {
										// if (isTimeline) {
											lfo.frequency.value = action.frequency
											lfo.syncFrequency()
										// } else {
										// 	lfo.frequency.value = action.frequency / 100
										// }
										return lfo
									})
		case 'CHANGE_LFO_MIDVALUE' :
			state = state.setIn([action.id, 'midValue'], action.midValue)
			return changeToneLFOParamters(action.id, state)

		case 'CHANGE_LFO_PERCENT' :
console.log('Tone.Transport.bpm.value', Tone.Transport.bpm.value)
			state = state.setIn([action.id, 'percentChange'], action.percent )
			return changeToneLFOParamters(action.id, state, action)

		case 'TOGGLE_LFO_TIME_FREQ' :
			const wasTimeline = state.getIn([action.id, 'timelineBased'])
			return state.updateIn([action.id, 'toneComponent'], (lfo) => {
										if (wasTimeline) {
											lfo.frequency.value = state.getIn([action.id, 'frequency']) / 100
										} else {
											lfo.frequency.value = state.getIn([action.id, 'timelineFrequency'])
										}
										return lfo
									})
									.updateIn([action.id, 'timelineBased'], v => !v)
		case 'SYNC_LFO_FREQ' :
			return state.updateIn([action.id, 'toneComponent'], lfo => lfo.syncFrequency())
	}
	return state
}

const setLFOParamsOnConnection = (state, action) => {
	state = state.setIn([action.lfoID, 'midValue'], action.midValue)
							.setIn([action.lfoID, 'minValue'], action.minValue)
							.setIn([action.lfoID, 'maxValue'], action.maxValue)
	return changeToneLFOParamters(action.lfoID, state, action)
}

const changeToneLFOParamters = (id, state) => {
	return state.updateIn([id, 'toneComponent'], (lfo) => {
									const totalDifference = state.getIn([id, 'maxValue']) - state.getIn([id, 'minValue'])
									const difference = ((state.getIn([id, 'percentChange'])*totalDifference)/100)/2
									// console.log('totalAmount', totalDifference)
									// console.log('difference', difference)
									const midValue = state.getIn([id, 'midValue'])
									const minValue = midValue - difference
									const maxValue = midValue + difference
									console.log('minValue', minValue)
									console.log('maxValue', maxValue)
									lfo.min = minValue < state.getIn([id, 'minValue']) ? state.getIn([id, 'minValue']) : minValue
									lfo.max = maxValue > state.getIn([id, 'maxValue']) ? state.getIn([id, 'maxValue']) : maxValue
									console.log('lfo', lfo)
									return lfo
								})
}