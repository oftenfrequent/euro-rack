export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.isLFO) {
				return setLFOParamsOnConnection(state, action)
			}

			if (action.module === 'lfos') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
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
			return state.setIn([action.id, 'frequency'], action.frequency )
									.updateIn([action.id, 'toneComponent'], (lfo) => {
										lfo.frequency.value = action.frequency
										return lfo
									})
		case 'CHANGE_LFO_MIDVALUE' :
			state = state.setIn([action.id, 'midValue'], action.midValue)
			return changeToneLFOParamters(action.id, state)

		case 'CHANGE_LFO_PERCENT' :
			state = state.setIn([action.id, 'percentChange'], action.percent )
			return changeToneLFOParamters(action.id, state, action)
			// return state.setIn([action.id, 'percentChange'], action.percent )
			// 						.updateIn([action.id, 'toneComponent'], (lfo) => {
			// 							console.log('change min and max based on midValue')
			// 							// lfo.frequency.value = action.frequency
			// 							return lfo
			// 						})
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
									lfo.min = minValue < state.getIn([id, 'minValue']) ? state.getIn([id, 'minValue']) : minValue
									lfo.max = maxValue > state.getIn([id, 'maxValue']) ? state.getIn([id, 'maxValue']) : maxValue
									console.log('lfo', lfo)
									return lfo
								})
}

// const ifFreqChangeAffectsLFO = (state, action) => {
// 	Array.from(state.keys()).map( id => {
// 		const color = state.getIn([id, 'output', 'lfo'])
// 		if (color && color === action.cvInputColor) {
// 			console.log('CHANGE MIN AND MAX BASED ON freq:', action.frequency)
// 			state = changeFrequency(state, Tone.Frequency(action.freq).toFrequency(), id)
// 		}
// 	})
// }