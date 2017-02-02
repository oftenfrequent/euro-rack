import Tone from 'tone'

export default {
	// toneComponent: new Tone.LFO(300, 0, 1000).start(),
	toneComponent: new Tone.LFO('4n', 0, 1).start(),
	minValue: 1,
	maxValue: 10,
	min: 0,
	max: 1000,
	frequency: '4n',
	type: 'sine',
	valueOptions: ['8m','4m','2m','1m','2n','3n','4n','8n','12n','16n'],
	typeOptions: ['sine', 'square', 'triangle', 'sawtooth'],
	output: {
		lfo: null
	},
	input: {
		amplitude: null
	}
}