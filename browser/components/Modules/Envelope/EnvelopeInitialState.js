import Tone from 'tone'

const initialState = () => {
	return {
		flexOrder: 0,
	  min: 1,
	  max: 1000,
	  attack: 10,
	  decay: 200,
	  sustain: 1000,
	  release: 600,
		attackCurve: 'linear',
		releaseCurve: 'exponential',
	  curveOptions: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step'],
	  selectedTimeLength: 'short',
	  timeLengths: ['short', 'medium', 'long'],
	  outputArray: ['output1', 'output2', 'inverse'],
		input: {
			trigger: {
				color: null
			}
		},
		output: {
			output1: {
				color: null,
			  scaleMin: 0,
			  scaleMax: 1,
				toneComponent: new Tone.ScaledEnvelope({
				 	'attack' : 0.01,
				 	'decay' : 0.2,
				 	'sustain' : 1,
				 	'release' : 0.6,
				 	'min' : 0,
				 	'max' : 1
				})
			},
			output2: {
				color: null,
			  scaleMin: 0,
			  scaleMax: 1,
				toneComponent: new Tone.ScaledEnvelope({
				 	'attack' : 0.01,
				 	'decay' : 0.2,
				 	'sustain' : 1,
				 	'release' : 0.6,
				 	'min' : 0,
				 	'max' : 1
				})
			},
			inverse: {
				color: null,
			  scaleMin: 0,
			  scaleMax: 1,
				toneComponent: new Tone.ScaledEnvelope({
				 	'attack' : 0.01,
				 	'decay' : 0.2,
				 	'sustain' : 1,
				 	'release' : 0.6,
				 	'min' : 1,
				 	'max' : 0
				})
			}
		}
	}
}

export default initialState
