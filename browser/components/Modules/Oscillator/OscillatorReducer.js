import Tone from 'tone'

export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'oscillators') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
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


		case 'MIDI_GATE_ATTACK_TRIGGER' :
			return isChangeFreqApplicable(state, action)
	}
	return state
}


const isChangeFreqApplicable = (state, action) => {
	Array.from(state.keys()).map( (id, index) => {
		const color = state.getIn([id, 'input', 'frequency'])
		if (color && color === action.freqColor) {
			state = changeFrequency(state, Tone.Frequency(action.freq).toFrequency(), id)
		}
	})
	return state
}

const changeFrequency = (state, frequency, id) => {
	return state.setIn([id, 'frequency'], frequency )
							.updateIn([id, 'toneComponent'], (osc) => {
								osc.frequency.value = frequency
								return osc
							})
}