import { fromJS } from 'immutable'
import Tone from 'tone'

const initialState = {
	eurorack: fromJS({
		connectingCables: {
			input: null,
			output: null,
			color: null,
			colorOptions: ['orange', 'royalblue', 'purple', 'red', 'yellowgreen', 'forestgreen' ],
			error: null
		},


		oscillator: {
			toneComponent: new Tone.Oscillator(200, 'sine').start(),
	    min: 0,
	    max: 1000,
			frequency: 200,
			type: 'sine',
			typeOptions: ['sine', 'square', 'triangle', 'sawtooth'],
			input: {
				frequency: null
			},
			output: {
				sound: null
			}
		},

		envelope: {
			toneComponent: new Tone.AmplitudeEnvelope(0.01, 0.2, 1, 0.6),
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
				sound: null
			},
			output: {
				sound: null
			}
		},

		filter: {
	    toneComponent: new Tone.Filter(400, 'lowpass', -12),
		  min: 0,
		  max: 1000,
		  frequency: 400,
		  type: 'lowpass',
		  typeOptions: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
		  rolloffOptions: [-12, -24, -48, -96],
		  rolloff: -12,
			input: {
				sound: null
			},
			output: {
				sound: null
			}
		},

		lfo: {
			toneComponent: new Tone.LFO(300, 0, 4000).start(),
			minValue: 0,
			maxValue: 4000,
			min: 0,
			max: 8000,
			frequency: 300,
			type: 'sine',
			typeOptions: ['sine', 'square', 'triangle', 'sawtooth'],
			output: {
				lfo: null
			}
		},
		speaker: {
			toneComponent: Tone.Master,
			input: {
				sound: null
			}
		}
	}),

	// connections: {
	// 	example: ['input', 'output']
	// }
}

export default initialState