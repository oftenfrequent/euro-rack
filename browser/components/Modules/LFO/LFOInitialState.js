import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.LFO({
			type:'sine',
			min:0,
			max:1,
			phase:0,
			frequency:0.01,
			amplitude:1,
			units:Tone.Type.Default
		}).start(),
		timelineBased: false,
		flexOrder: 0,
		min: 0.01, // TODO: get rid of
		max: 10, // TODO: get rid of
		minValue: 0,
		midValue: 0.5,
		maxValue: 1,
		percentChange: 0,
		timelineFrequency: '4n',
		frequency: 0.01,
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