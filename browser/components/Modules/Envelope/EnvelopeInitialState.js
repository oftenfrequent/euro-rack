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
	  min: 1,
	  max: 1000,
	  attack: 10,
	  decay: 200,
	  sustain: 1000,
	  release: 600,
	  scaleMin: 0,
	  scaleMax: 1,
		attackCurve: 'linear',
		releaseCurve: 'exponential',
	  curveOptions: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step'],
	  selectedTimeLength: 'short',
	  timeLengths: ['short', 'medium', 'long'],
		input: {
			frequency: null,
			trigger: null
		},
		output: {
			envelope: null
		}
	}
}

export default initialState
