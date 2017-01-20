import { fromJS } from 'immutable'
import Tone from 'tone'

const audioContext = Tone.context

const initialState = {
	eurorack: fromJS({
		connectingCables: {
			input: null,
			output: null,
			color: null,
			colorOptions: ['orange', 'royalblue', 'purple', 'red', 'yellowgreen', 'forestgreen' ],
			error: null,
			connections: {
				// white: {
				// 	input: {
				// 		module: 'example',
				// 		cvName: 'example',
				// 		toneObject: 'example'
				// 	},
				// 	output: {
				// 		module: 'example',
				// 		cvName: 'example',
				// 		toneObject: 'example'
				// 	}
				// }
			}
		},
		midi: {
			inputDevice: null,
			output: {
				gate: null,
				cvToFreq: null,
			},
			error: null
		},

		oscillator: {
			toneComponent: new Tone.OmniOscillator(200, 'sine').start(),
	    min: 0,
	    max: 1000,
			frequency: 200,
			modulationFrequency: 0,
			type: 'sine',
			typeOptions: ['sine', 'square', 'triangle', 'sawtooth', 'pwm'],
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
				sound: null,
				frequency: null,
				trigger: null
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
			// analyser: new Tone.Analyser('fft', 2048),
			analyser: audioContext.createAnalyser(),
			input: {
				sound: null
			}
		}
	})
}

export default initialState