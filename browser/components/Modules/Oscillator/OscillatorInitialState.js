import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.OmniOscillator(200, 'sine').start(),
		flexOrder: 0,
	  min: 0,
	  max: 1000,
		frequency: 200,
		modulationFrequency: 0,
		type: 'sine',
		typeOptions: ['sine', 'square', 'triangle', 'sawtooth', 'pwm'],
		toneRangeStart: [8.176, 16.3515, 32.703, 65.406, 130.813],
		input: {
			frequency: null,
			pwModulation: null,
			cvFrequency: null
		},
		output: {
			sound: null
		}
	}
}

export default initialState