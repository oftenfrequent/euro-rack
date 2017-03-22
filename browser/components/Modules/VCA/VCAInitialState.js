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
			cv1:  {
        color: null,
        attention: false
      },
			cv2:  {
        color: null,
        attention: false
      },
			audioIn1:  {
        color: null,
        attention: false
      },
			audioIn2:  {
        color: null,
        attention: false
      }
		},
		output: {
			audio:  {
        color: null,
        attention: false
      }
		}
	}
}

export default initialState