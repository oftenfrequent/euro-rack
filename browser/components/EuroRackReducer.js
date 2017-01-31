import { fromJS } from 'immutable'

const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'CONNECT_JACK' :
			return connectJack(state, action)
		case 'DISCONNECT_JACK' :
			return disconnectJack(state, action)


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
		case 'CHANGE_OSC_MOD_FREQ' :
			return state.setIn(['oscillator', 'modulationFrequency'], action.frequency )
									.updateIn(['oscillator', 'toneComponent'], (osc) => {
										if (osc.type === 'pwm') { osc.modulationFrequency.value = action.frequency }
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
										if (action.component === 'sustain') {
											env[action.component] = action.value / 1000
										} else {
											env[action.component] = action.value / 100
										}
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
										lfo.max = action.maxValue
										return lfo
									})
	// MIDI
		case 'MIDI_CONNECTION_ERROR' :
			return state.setIn(['midi', 'error'], action.error)
		case 'SET_MIDI_INPUT' :
			return state.setIn(['midi', 'inputDevice'], action.input)
									.setIn(['midi', 'error'], null)
		case 'MIDI_GATE_ATTACK_TRIGGER' :
			return triggerFreqCV(state, action)
		case 'MIDI_GATE_RELEASE_TRIGGER' :
			return triggerRelease(state, action)
	}
	return state
}

const triggerFreqCV = (state, action) => {
	state = state.setIn(['midi', 'freq'], action.freq)
							 // .updateIn(['midi', 'notesDown'], (noteArr) => noteArr.push(action.freq))

	const cvOutputColor = state.getIn(['midi', 'output', 'cvToFreq'])
	const gateColor = state.getIn(['midi', 'output', 'gate'])


	if (cvOutputColor) {
		const inputObj = state.getIn(['connectingCables', 'connections', cvOutputColor, 'input'])
		const inputToneObjFrequency = inputObj.get('toneObject')

		inputToneObjFrequency.value = action.freq

		const freqInHertz = inputToneObjFrequency.value
		state = state.setIn([inputObj.get('module'), 'frequency'], freqInHertz)
	}

	if (gateColor) {
		const inputToneObj = state.getIn(['connectingCables', 'connections', gateColor, 'input', 'toneObject'])
		inputToneObj.triggerAttack()
	}

	return state
}

const triggerRelease = (state, action) => {
	const gateColor = state.getIn(['midi', 'output', 'gate'])

	if (gateColor) {
		const inputToneObj = state.getIn(['connectingCables', 'connections', gateColor, 'input', 'toneObject'])
		inputToneObj.triggerRelease()
	}

	return state
}

const disconnectJack = (state, action) => {
	const input = state.getIn(['connectingCables', 'connections', action.color, 'input'])
	const output = state.getIn(['connectingCables', 'connections', action.color, 'output'])
	const inToneObj = input.get('toneObject')
	const outToneObj = output.get('toneObject')

	outToneObj.disconnect(inToneObj)

	return state.deleteIn(['connectingCables', 'connections', action.color])
							.updateIn(['connectingCables', 'colorOptions'], (arr) => arr.push(action.color))
							.setIn([input.get('module'), 'input', input.get('cvName')], null)
							.setIn([output.get('module'), 'output', output.get('cvName')], null)
}

const connectJack = (state, action) => {
	let cableColor = state.getIn(['connectingCables', 'color'])
	if (!cableColor) {
		state = addColorToConnectingComponents(state)
		cableColor = state.getIn(['connectingCables', 'color'])
		return addConnectionObjectToDirection(state, action, cableColor)

	} else {
		state = addSecondModuleOrError(state, action, cableColor)
		state = makeConnectionIfPossible(state, action, cableColor)
		return state
	}
}

const addConnectionObjectToDirection = (state, action, cableColor) => {
	return state.setIn([action.module, action.direction, action.cvName], cableColor)
							.setIn(['connectingCables', action.direction], fromJS({
								module: action.module,
								cvName: action.cvName,
								toneObject: action.toneObject
							}))
}

const addSecondModuleOrError = (state, action, cableColor) => {
	if (!state.getIn(['connectingCables', action.direction])) {
		return addConnectionObjectToDirection(state, action, cableColor)
	} else {
		return state.setIn(['connectingCables', 'error'], `You have already selected an ${action.direction}`)
	}
}

const makeConnectionIfPossible = (state, action, cableColor) => {
	const output = state.getIn(['connectingCables', 'output', 'toneObject'])
	const input = state.getIn(['connectingCables', 'input', 'toneObject'])
	if (input && output) {
		// output.connect(input)
    // TODO: remove from master
    if (state.getIn(['connectingCables', 'input', 'module']) === 'speaker') {
      output.connect(state.getIn(['speaker', 'analyser']))
      state.getIn(['speaker', 'analyser']).connect(input)
    } else {
    	if (state.getIn(['connectingCables', 'output', 'module']) === 'midi') { console.log('NO ACTUAL CONNECTION') }
    	else { output.connect(input) }
    }
		return state.setIn(['connectingCables', 'connections', cableColor, 'input'], state.getIn(['connectingCables', 'input']))
								.setIn(['connectingCables', 'connections', cableColor, 'output'], state.getIn(['connectingCables', 'output']))
								.setIn(['connectingCables', 'input'], null)
								.setIn(['connectingCables', 'output'], null)
								.setIn(['connectingCables', 'color'], null)
								.setIn(['connectingCables', 'error'], null)

	} else {
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