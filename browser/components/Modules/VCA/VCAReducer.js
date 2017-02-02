import Tone from 'tone'

export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'vcas') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'CHANGE_VCA_GAIN' :
			return state.setIn([action.id, 'value'], action.value )
									.updateIn([action.id, 'toneComponent'], (gain) => {
										console.log('gain', gain)
										gain.output.gain.value = action.value / 1000
										return gain
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