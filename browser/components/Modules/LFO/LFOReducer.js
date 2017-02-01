export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
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
		case 'CHANGE_LFO_MIN' :
			return state.setIn([action.id, 'minValue'], action.minValue )
									.updateIn([action.id, 'toneComponent'], (lfo) => {
										lfo.min = action.minValue
										return lfo
									})
		case 'CHANGE_LFO_MAX' :
			return state.setIn([action.id, 'maxValue'], action.maxValue )
									.updateIn([action.id, 'toneComponent'], (lfo) => {
										lfo.max = action.maxValue
										return lfo
									})
	}
	return state
}