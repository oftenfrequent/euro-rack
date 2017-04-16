import uuid from 'uuid'
import {fromJS} from 'immutable'

import VCAInitialStateCreator from './VCAInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'RESET_EURORACK' :
			return state = fromJS({})
		case 'ADD_VCA' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(VCAInitialStateCreator()))
		case 'REMOVE_VCA' :
			return state.delete(action.id)
		case 'CONNECT_JACK' :
			if (action.module === 'vcas') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'vcas') {
				if (action.inputCvName === 'cv1') {
					state = state.updateIn([action.inputId, 'outputToneComponent'], (gain) => {
						gain.output.gain.value = state.getIn([action.inputId, 'outputValue']) / 1000
						return gain
					})
				}
				return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										.setIn([action.inputId, 'input', action.inputCvName, 'attention'], false )
			} else if (action.outputModule === 'vcas') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'color'], null)
										.setIn([action.outputId, 'output', action.outputCvName, 'attention'], false )

			} else {
				return state
			}

			return state
		case 'INITIALIZE_VCA' :
			const input1 = state.getIn([action.id, 'input1ToneComponent'])
			const input2 = state.getIn([action.id, 'input2ToneComponent'])
			const output = state.getIn([action.id, 'outputToneComponent'])
			input1.connect(output)
			input2.connect(output)
			return state
		case 'CHANGE_VCA_GAIN' :
			const gainType = action.gainType.substr(0, 6)

			if (gainType === 'output') {
				return state.setIn([action.id, 'outputValue'], action.value )
										.updateIn([action.id, 'outputToneComponent'], (gain) => {
											if (!state.getIn([action.id, 'input', 'cv1', 'color'])) {
												console.log('gain', gain)
												gain.output.gain.value = action.value / 1000
											}
											return gain
										})
			} else if (gainType === 'input1') {
				return state.setIn([action.id, 'input1Value'], action.value )
										.updateIn([action.id, 'input1ToneComponent'], (gain) => {
											gain.output.gain.value = action.value / 1000
											return gain
										})
			} else if (gainType === 'input2') {
				return state.setIn([action.id, 'input2Value'], action.value )
										.updateIn([action.id, 'input2ToneComponent'], (gain) => {
											gain.output.gain.value = action.value / 1000
											return gain
										})
			}
		case 'WALKTHROUGH_STEP' :
			if (action.outputModule === 'vcas') {
				return state.setIn([action.outputId, 'output', action.outputCvName, 'attention'], true)
			} else if (action.inputModule === 'vcas') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'attention'], true)
			} else {
				return state
			}
	}
	return state
}