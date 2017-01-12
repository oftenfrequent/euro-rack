const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'CONNECT_JACK' :
			return connectJack(state, action)


	// OSCILLATOR
		case 'CHANGE_OSC_TYPE' :
			return state.setIn(['oscillator', 'type'], action.oscType )
									.updateIn(['oscillator', 'toneComponent'], (osc) => {
										osc.type = action.oscType
										return osc
									})
		case 'CHANGE_OSC_FREQ' :
			return state.setIn(['oscillator', 'frequency'], action.frequency )
									.updateIn(['oscillator', 'toneComponent'], (osc) => {
										osc.frequency.value = action.frequency
										return osc
									})


	// ENVELOPE
		case 'CHANGE_ENV_CURVE_TYPE' :
			return state.setIn(['envelope', 'attackCurve'], action.curveType )
									.setIn(['envelope', 'releaseCurve'], action.curveType )
									.updateIn(['envelope', 'toneComponent'], (env) => {
										env.attackCurve = action.curveType
										env.releaseCurve = action.curveType
										return env
									})
		case 'CHANGE_ENV_COMP_VALUE' :
			return state.setIn(['envelope', action.component], action.value )
									.updateIn(['envelope', 'toneComponent'], (env) => {
										env[action.component] = action.value / 1000
										return env
									})
		case 'TRIGGER_ATTACK_RELEASE' :
			return state.updateIn(['envelope', 'toneComponent'], (env) => {
										env.triggerAttackRelease(0.8)
										return env
									})


	// FILTER
		case 'CHANGE_FIL_TYPE' :
			return state.setIn(['filter', 'type'], action.filterType )
									.updateIn(['filter', 'toneComponent'], (fil) => {
										fil.type = action.filterType
										return fil
									})
		case 'CHANGE_FIL_FREQ' :
			return state.setIn(['filter', 'frequency'], action.frequency )
									.updateIn(['filter', 'toneComponent'], (fil) => {
										fil.frequency.value = action.frequency
										return fil
									})
		case 'CHANGE_FIL_ROLLOFF' :
			return state.setIn(['filter', 'rolloff'], action.rolloff )
									.updateIn(['filter', 'toneComponent'], (fil) => {
										fil.rolloff = action.rolloff
										return fil
									})

	// LFO
		case 'CHANGE_LFO_TYPE' :
			return state.setIn(['lfo', 'type'], action.oscType )
									.updateIn(['lfo', 'toneComponent'], (lfo) => {
										lfo.type = action.oscType
										return lfo
									})
		case 'CHANGE_LFO_FREQ' :
			return state.setIn(['lfo', 'frequency'], action.frequency )
									.updateIn(['lfo', 'toneComponent'], (lfo) => {
										lfo.frequency.value = action.frequency
										return lfo
									})
		case 'CHANGE_LFO_MIN' :
			return state.setIn(['lfo', 'minValue'], action.minValue )
									.updateIn(['lfo', 'toneComponent'], (lfo) => {
										lfo.min = action.minValue
										return lfo
									})
		case 'CHANGE_LFO_MAX' :
			return state.setIn(['lfo', 'maxValue'], action.maxValue )
									.updateIn(['lfo', 'toneComponent'], (lfo) => {
										lfo.rolloff = action.maxValue
										return lfo
									})
	}
	return state
}


const connectJack = (state, action) => {
	if (!state.getIn(['connectingCables', 'color'])) {
		state = addColorToConnectingComponents(state)
		return state.setIn(['connectingCables', action.direction], action.toneObject)
								.setIn([action.module, action.direction, action.cvName], state.getIn(['connectingCables', 'color']))
	} else {
		state = addModuleOrError(state, action)
		state = makeConnectionIfPossible(state, action)
		return state
	}
}

const addModuleOrError = (state, action) => {
	if (!state.getIn(['connectingCables', action.direction])) {
		return state.setIn(['connectingCables', action.direction], action.toneObject)
								.setIn([action.module, action.direction, action.cvName], state.getIn(['connectingCables', 'color']))
	} else {
		return state.setIn(['connectingCables', 'error'], `You have already selected an ${action.direction}`)
	}
}

const makeConnectionIfPossible = (state, action) => {
	const output = state.getIn(['connectingCables', 'output'])
	const input = state.getIn(['connectingCables', 'input'])
	if (input && output) {
		output.connect(input)
		return state.setIn(['connectingCables', 'input'], null)
								.setIn(['connectingCables', 'output'], null)
								.setIn(['connectingCables', 'color'], null)
								.setIn(['connectingCables', 'error'], null)
	} else {
		console.log('HOW On EARTHHHTHHTTHTH!?!?!?!?')
		return state
	}
}


const addColorToConnectingComponents = (state) => {
	const randomIndex = Math.floor( Math.random() * state.getIn(['connectingCables', 'colorOptions']).size )
	const color = state.getIn(['connectingCables','colorOptions', randomIndex])
	console.log('randomIndex', randomIndex)
	console.log('color', color)
	return state.setIn(['connectingCables', 'color'], color)
							.updateIn(['connectingCables', 'colorOptions'], (arr) => {
								return arr.filter((c,i) => randomIndex !== i)
							})
}


export default reducer