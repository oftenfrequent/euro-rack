import { fromJS } from 'immutable'
import Tone from 'tone'


const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'CONNECT_JACK' :
			return connectJack(state, action)
		case 'DISCONNECT_JACK' :
			return disconnectJack(state, action)
		case 'SET_ORDER' :
			return state.set('order', fromJS(action.order))
		case 'PUSH_ORDER' :
			return state.update('order', (o) => o.push(action.id))
		case 'CONNECT_JACK_ERROR' :
			return state.setIn(['patchCables', 'error'], action.error)
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

const disconnectJack = (state, action) => {
	if (action.outputModule === 'midis') { console.log('NO ACTUAL CONNECTION') }
	else if (action.singleJack) {
		console.log('NO ACTUAL CONNECTION')
		state = state.setIn(['patchCables', 'input'], null)
								 .setIn(['patchCables', 'output'], null)
								 .setIn(['patchCables', 'active'], false)
	}
	else { action.outputToneObject.disconnect(action.inputToneObj) }

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