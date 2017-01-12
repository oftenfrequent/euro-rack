export default (state = {}, action) => {
	switch(action.type) {
		case 'CHANGE_OSC_TYPE' :
			return state.set('type', action.oscType )
									.update('toneComponent', (osc) => {
										osc.type = action.oscType
										return osc
									})
		case 'CHANGE_OSC_FREQ' :
			return state.set('frequency', action.frequency )
									.update('toneComponent', (osc) => {
										osc.frequency.value = action.frequency
										return osc
									})
	}
	return state
}