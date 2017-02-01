import Tone from 'tone'

export default  {
	toneComponent: Tone.Master,
	analyser: Tone.context.createAnalyser(),
	input: {
		sound: null
	}
}