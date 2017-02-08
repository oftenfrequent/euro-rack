import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.Gain(),
		flexOrder: 0,
	  min: 0,
	  max: 1000,
		value: 1000,
		input: {
			cv1: null,
			cv2: null,
			audioIn1: null,
			audioIn2: null,
		},
		output: {
			audio: null
		}
	}
}

export default initialState