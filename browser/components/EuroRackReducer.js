import { fromJS } from 'immutable'
import uuid from 'uuid'
import Tone from 'tone'
import OscillatorInitialState from './Modules/Oscillator/OscillatorInitialState'
import LFOInitialState from './Modules/LFO/LFOInitialState'
import EnvelopeInitialState from './Modules/Envelope/EnvelopeInitialState'


const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'CONNECT_JACK' :
			return connectJack(state, action)
		case 'DISCONNECT_JACK' :
			return disconnectJack(state, action)

		// case 'ADD_OSCILLATOR' :
		// 	return state.update('oscillators', (map) => map.set(uuid.v4(), fromJS(OscillatorInitialState)))

		// case 'ADD_LFO' :
		// 	return state.update('lfos', (map) => map.set(uuid.v4(), fromJS(LFOInitialState)))

		// case 'ADD_ENVELOPE' :
		// 	return state.update('envelopes', (map) => map.set(uuid.v4(), fromJS(EnvelopeInitialState)))


		// MIDI
		case 'MIDI_GATE_ATTACK_TRIGGER' :
			return triggerFreqCV(state, action)
		case 'MIDI_GATE_RELEASE_TRIGGER' :
			return triggerRelease(state, action)

		case 'TESTING_STUFF' :
			console.log('ASLDFHASLD')
			const osc = new Tone.OmniOscillator(200, 'pwm').start().toMaster()
			// const osc1 = new Tone.OmniOscillator(700, 'pwm').start()
			// const gain = new Tone.Gain().toMaster()
			const lfo = new Tone.LFO('1m', 100, 300).start()
			// const env = new Tone.Envelope(0.01, 0.1, 0.5, 0.1)


			// osc1.connect(gain)
			// lfo.connect(osc.modulationFrequency)
			// lfo.connect(gain.gain)
			// env.connect(lfo.amplitude)

			setTimeout(() => {
				console.log('connect lfo')
				lfo.connect(osc.frequency)
			// 	env.triggerAttackRelease(2)
			}, 7000)

			setInterval(() => {
				console.log('osc freq', osc.frequency.value)
			}, 70)

			// const lfo = new Tone.LFO(200).start()

			// gain.toMaster()

			return state

	}
	return state
}

const triggerFreqCV = (state, action) => {
	if (action.gateColor) {
		const inputToneObj = state.getIn(['patchCables', 'connections', action.gateColor, 'input', 'toneObject'])
		inputToneObj.triggerAttack()
	}

	return state
}

const triggerRelease = (state, action) => {
	if (action.gateColor) {
		const inputToneObj = state.getIn(['patchCables', 'connections', action.gateColor, 'input', 'toneObject'])
		inputToneObj.triggerRelease()
	}

	return state
}

const disconnectJack = (state, action) => {
	// const input = state.getIn(['patchCables', 'connections', action.color, 'input'])
	// const output = state.getIn(['patchCables', 'connections', action.color, 'output'])
	// const inToneObj = input.get('toneObject')
	// const outToneObj = output.get('toneObject')

	action.outputToneObject.disconnect(action.inputToneObj)

	return state.deleteIn(['patchCables', 'connections', action.color])
							.updateIn(['patchCables', 'colorOptions'], (arr) => arr.push(action.color))
}

const connectJack = (state, action) => {
	const currentlyActive = state.getIn(['patchCables', 'active'])
	state = addConnectionObjectToDirection(state, action)
	if (currentlyActive) {
		state = makeConnection(state, action)
	}
	return state
}

const addConnectionObjectToDirection = (state, action) => {
	return state.updateIn(['patchCables', 'active'], (v) => !v)
							.setIn(['patchCables', action.direction], fromJS({
								module: action.module,
								id: action.id,
								cvName: action.cvName,
								toneObject: action.toneObject
							}))
}

const makeConnection = (state, action) => {
	const cableColor = state.getIn(['patchCables', 'color'])
	const output = state.getIn(['patchCables', 'output', 'toneObject'])
	const input = state.getIn(['patchCables', 'input', 'toneObject'])
	console.log("state.getIn(['patchCables', 'output', 'module'])", state.getIn(['patchCables', 'output', 'module']))
	if (state.getIn(['patchCables', 'output', 'module']) === 'midis') { console.log('NO ACTUAL CONNECTION') }
	else { output.connect(input) }

	const randomIndex = Math.floor( Math.random() * state.getIn(['patchCables', 'colorOptions']).size )
	const newColor = state.getIn(['patchCables','colorOptions', randomIndex])

	return state.setIn(['patchCables', 'connections', cableColor, 'input'], state.getIn(['patchCables', 'input']))
							.setIn(['patchCables', 'connections', cableColor, 'output'], state.getIn(['patchCables', 'output']))
							.setIn(['patchCables', 'input'], null)
							.setIn(['patchCables', 'output'], null)
							.setIn(['patchCables', 'color'], newColor)
							.setIn(['patchCables', 'error'], null)
							.updateIn(['patchCables', 'colorOptions'], (arr) => {
								return arr.filter((c,i) => randomIndex !== i)
							})
}

export default reducer