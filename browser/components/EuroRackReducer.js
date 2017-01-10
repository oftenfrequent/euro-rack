const reducer = (state = initialState, action) => {
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
		case 'ELSE' :
			return state
	}
	return state
}

export default reducer