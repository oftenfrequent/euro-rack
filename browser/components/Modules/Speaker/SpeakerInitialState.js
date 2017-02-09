import Tone from 'tone'

export default  {
	toneComponent: Tone.Master,
	blankToneComponent: new Tone.Oscillator(0).start(),
	analyser: Tone.context.createAnalyser(),
	flexOrder: 0,
	input: {
		sound: null
	}
}