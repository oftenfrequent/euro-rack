import Tone from 'tone'

const initialState = () => {
	return {
		input1ToneComponent: new Tone.Gain(),
		input2ToneComponent: new Tone.Gain(),
		outputToneComponent: new Tone.Gain(),
		flexOrder: 0,
	  min: 0,
	  max: 1000,
		outputValue: 1000,
		input1Value: 1000,
		input2Value: 1000,
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