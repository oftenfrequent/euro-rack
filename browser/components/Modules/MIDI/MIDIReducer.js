export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'midis') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}

	// MIDI
		case 'MIDI_CONNECTION_ERROR' :
			return state.setIn([action.id, 'error'], action.error)
		case 'SET_MIDI_INPUT' :
			return state.setIn([action.id, 'inputDevice'], action.input)
									.setIn([action.id, 'error'], null)
		case 'MIDI_GATE_ATTACK_TRIGGER' :
			return state = state.setIn([action.id, 'freq'], action.freq)
		case 'MIDI_GATE_RELEASE_TRIGGER' :
			// TODO: not sure yet
			return state
	}
	return state
}