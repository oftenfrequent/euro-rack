import Tone from 'tone'

export default  {
	toneComponent: Tone.Master,
	blankToneComponent: new Tone.Oscillator(0).start(),
	analyser: Tone.context.createAnalyser(),
	min: 20,
	max: 300,
	currentBPM: 120,
	flexOrder: 0,
	input: {
		sound: null
	}
}