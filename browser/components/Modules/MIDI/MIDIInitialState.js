
const initialState = () => {
	return {
		inputDevice: null,
		flexOrder: 0,
		output: {
			gate1: {
				color: null,
				attention: false
			},
			gate2: {
				color: null,
				attention: false
			},
			gate3: {
				color: null,
				attention: false
			},
			cvToFreq1: {
				color: null,
				attention: false
			},
			cvToFreq2: {
				color: null,
				attention: false
			},
			cvToFreq3: {
				color: null,
				attention: false
			},
		},
		error: null,
		freq: null,
		notesDown: []
	}
}

export default initialState