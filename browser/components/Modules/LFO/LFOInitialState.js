import Tone from 'tone'

export default {
	toneComponent: new Tone.LFO(300, 0, 1000).start(),
	minValue: 0,
	maxValue: 1000,
	min: 0,
	max: 1000,
	frequency: 300,
	type: 'sine',
	typeOptions: ['sine', 'square', 'triangle', 'sawtooth'],
	output: {
		lfo: null
	}
}