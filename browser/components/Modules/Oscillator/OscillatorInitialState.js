import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.OmniOscillator(200, 'sine').start(),
		flexOrder: 0,
	  min: 0,
	  max: 1000,
		frequency: 200,
		type: 'sine',
		// toneRangeStart: [8.176, 16.3515, 32.703, 65.406, 130.813],
		typesArray: ['sine', 'triangle', 'sawtooth', 'pwm'],
		input: {
			frequency: {
				color: null
			},
			pwModulation: {
				color: null
			},
			cvFrequency: {
				color: null
			}
		},
		output: {
			sine: {
				color: null,
				toneComponent: new Tone.OmniOscillator(200, 'sine').start()
			},
			triangle: {
				color: null,
				toneComponent: new Tone.OmniOscillator(200, 'triangle').start()
			},
			sawtooth: {
				color: null,
				toneComponent: new Tone.OmniOscillator(200, 'sawtooth').start()
			},
			pwm: {
				color: null,
				modulationFrequency: 0,
				toneComponent: new Tone.OmniOscillator(200, 'pwm').start()
			}
		}
	}
}

export default initialState