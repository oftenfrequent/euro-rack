import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.LFO(0.5, 0, 1).start(),
		timelineBased: false,
		flexOrder: 0,
		min: 0, // TODO: get rid of
		max: 1000, // TODO: get rid of
		minValue: 0,
		midValue: 0.5,
		maxValue: 1,
		percentChange: 0.5,
		timelineFrequency: '4n',
		frequency: '0',
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
}

export default initialState