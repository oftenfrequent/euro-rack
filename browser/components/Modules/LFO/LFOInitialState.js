import Tone from 'tone'

export default {
	toneComponent: new Tone.LFO('4n', 0, 1).start(),
	min: 0, // TODO: get rid of
	max: 1000, // TODO: get rid of
	minValue: 0,
	midValue: 0.5,
	maxValue: 1,
	percentChange: 0,
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