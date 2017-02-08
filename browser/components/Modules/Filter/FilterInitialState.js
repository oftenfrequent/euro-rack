import Tone from 'tone'

const initialState = () => {
  return {
    toneComponent: new Tone.Filter(400, 'lowpass', -12),
    flexOrder: 0,
    min: 0,
    max: 1000,
    frequency: 400,
    type: 'lowpass',
    typeOptions: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
    rolloffOptions: [-12, -24, -48, -96],
    rolloff: -12,
  	input: {
  		sound: null
  	},
  	output: {
  		sound: null
  	}
  }
}

export default initialState
