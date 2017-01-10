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



	// OSCILLATOR
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


	// ENVELOPE
		case 'CHANGE_ENV_CURVE_TYPE' :
			return state.setIn(['env', 'attackCurve'], action.curveType )
									.setIn(['env', 'releaseCurve'], action.curveType )
									.updateIn(['env', 'envelope'], (env) => {
										env.attackCurve = action.curveType
										env.releaseCurve = action.curveType
										return env
									})
		case 'CHANGE_ENV_COMP_VALUE' :
			return state.setIn(['env', action.component], action.value )
									.updateIn(['env', 'envelope'], (env) => {
										env[action.component] = action.value / 1000
										return env
									})
		case 'TRIGGER_ATTACK_RELEASE' :
			return state.updateIn(['env', 'envelope'], (env) => {
										env.triggerAttackRelease(0.8)
										return env
									})


	// FILTER
		case 'CHANGE_FIL_TYPE' :
			return state.setIn(['fil', 'type'], action.oscType )
									.updateIn(['fil', 'filter'], (fil) => {
										fil.type = action.filType
										return fil
									})
		case 'CHANGE_FIL_FREQ' :
			return state.setIn(['fil', 'frequency'], action.frequency )
									.updateIn(['fil', 'filter'], (fil) => {
										fil.frequency.value = action.frequency
										return fil
									})
		case 'CHANGE_FIL_ROLLOFF' :
			return state.setIn(['fil', 'rolloff'], action.rolloff )
									.updateIn(['fil', 'filter'], (fil) => {
										fil.rolloff = action.rolloff
										return fil
									})
	}
	return state
}

export default reducer