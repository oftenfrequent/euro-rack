import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.LFO({
			type:'sine',
			frequency:0.01
		}).syncFrequency().start(),
		timelineBased: false,
		flexOrder: 0,
		min: 0.01, // TODO: get rid of
		max: 100, // TODO: get rid of
		minValue: 0,
		midValue: 0.5,
		maxValue: 1,
		percentChange: 0,
		timelineFrequency: '4n',
		frequency: 0.01,
		// type: 'sine',
		valueOptions: ['8m','4m','2m','1m','2n','3n','4n','8n','12n','16n'],
		// typeOptions: ['sine', 'square', 'triangle', 'sawtooth'],
		output: {
			sine: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				toneComponent: new Tone.LFO({ type:'sine', frequency:0.01 }).syncFrequency().start()
			},
			triangle: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				toneComponent: new Tone.LFO({ type:'triangle', frequency:0.01 }).syncFrequency().start()
			},
			sawtooth: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				toneComponent: new Tone.LFO({ type:'sawtooth', frequency:0.01 }).syncFrequency().start()
			},
			square: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				modulationFrequency: 0,
				toneComponent: new Tone.LFO({ type:'square', frequency:0.01 }).syncFrequency().start()
			}
		},
		input: {
			amplitude: {
				color: null
			}
		}

	}
}

export default initialState