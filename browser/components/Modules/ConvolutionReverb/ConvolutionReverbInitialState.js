import Tone from 'tone'
// import defaultReverb from '../../../assets/BatteryBenson.wav'

const initialState = () => {
	return {
		toneComponent: new Tone.Convolver(),
		flexOrder: 0,
		min: 0, // TODO: get rid of
		max: 100, // TODO: get rid of
		wetness: 0,
		input: {
			// add LFO to control wetness
			wetness: {
        attention: false,
        color: null
			},
			sound: {
        attention: false,
        color: null
			}
		},
		output: {
			sound: {
        attention: false,
        color: null
			}
		}
	}
}

export default initialState