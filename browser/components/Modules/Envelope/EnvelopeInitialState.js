import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.ScaledEnvelope({
		 	'attack' : 0.01,
		 	'decay' : 0.2,
		 	'sustain' : 1,
		 	'release' : 0.6,
		 	'min' : 0,
		 	'max' : 1
		}),
		flexOrder: 0,
	  min: 10,
	  max: 1000,
	  attack: 0,
	  decay: 200,
	  sustain: 1000,
	  release: 600,
		attackCurve: 'linear',
		releaseCurve: 'exponential',
	  curveOptions: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step'],
		input: {
			sound: null,
			frequency: null,
			trigger: null
		},
		output: {
			amplitude1: null,
			amplitude2: null
		}
	}
}

export default initialState
