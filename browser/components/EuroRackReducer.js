const reducer = (state, action) => {
	switch(action.type) {
		case 'CONNECT_JACK' :
			console.log('CONNECT_JACK')
			if(action.selectedModule === 'master' && state.get('selectedModule')) {
				const toMasterModule = state.get('selectedModule')
				state.set('selectedModule', null)
				toMasterModule.toMaster()
			}

			return state.update('selectedModule', (currentValue) => {
				console.log('currentValue', currentValue)
				if(currentValue) {
					currentValue.connect(action.selectedModule)
					return null
				} else {
					return action.selectedModule
				}
			})




		case 'CHANGE_OSC_TYPE' :
			return state.setIn(['vco', 'type'], action.oscType )
									.updateIn(['vco', 'oscillator'], (osc) => {
										osc.type = action.oscType
										return osc
									})


		case 'CHANGE_OSC_FREQ' :
			return state.setIn(['vco', 'frequency'], action.frequency )
									.updateIn(['vco', 'oscillator'], (osc) => {
										osc.frequency.value = action.frequency
										return osc
									})

	}
	return state
}

export default reducer