import Tone from 'tone'

export default  {
	toneComponent: Tone.Master,
	analyser: Tone.context.createAnalyser(),
	flexOrder: 0,
	input: {
		sound: null
	}
}