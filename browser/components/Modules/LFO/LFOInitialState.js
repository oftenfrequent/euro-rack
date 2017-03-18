import Tone from 'tone'

const initialState = () => {
	return {
		timelineBased: false,
		typeOptions: ['sine', 'square', 'triangle', 'sawtooth'],
		flexOrder: 0,
		min: 0.01, // TODO: get rid of
		max: 100, // TODO: get rid of
		// minValue: 0,
		// midValue: 0.5,
		// maxValue: 1,
		percentChange: 0,
		timelineFrequency: '4n',
		frequency: 0.01,
		valueOptions: ['8m','4m','2m','1m','2n','3n','4n','8n','12n','16n'],
		output: {
			sine: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				toneComponent: new Tone.BoundLFO({
					type:'sine',
					frequency:0.01,
					min: 0,
					max: 1,
					lowBound: 0,
					highBound: 1,
				}).syncFrequency().start()
			},
			triangle: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				toneComponent: new Tone.BoundLFO({
					type:'triangle',
					frequency:0.01,
					min: 0,
					max: 1,
					lowBound: 0,
					highBound: 1,
				}).syncFrequency().start()
			},
			sawtooth: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				toneComponent: new Tone.BoundLFO({
					type:'sawtooth',
					frequency:0.01,
					min: 0,
					max: 1,
					lowBound: 0,
					highBound: 1,
				}).syncFrequency().start()
			},
			square: {
				color: null,
				minValue: 0,
				midValue: 0.5,
				maxValue: 1,
				modulationFrequency: 0,
				toneComponent: new Tone.BoundLFO({
					type:'square',
					frequency:0.01,
					min: 0,
					max: 1,
					lowBound: 0,
					highBound: 1,
				}).syncFrequency().start()
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