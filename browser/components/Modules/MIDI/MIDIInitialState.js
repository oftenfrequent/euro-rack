
const initialState = () => {
	return {
		inputDevice: null,
		flexOrder: 0,
		output: {
			gate1: null,
			cvToFreq1: null,
			gate2: null,
			cvToFreq2: null,
			gate3: null,
			cvToFreq3: null,
		},
		error: null,
		freq: null,
		notesDown: []
	}
}

export default initialState