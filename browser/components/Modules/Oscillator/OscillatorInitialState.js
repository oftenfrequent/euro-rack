import Tone from 'tone'

export default  {
	toneComponent: new Tone.OmniOscillator(200, 'sine').start(),
  min: 0,
  max: 1000,
	frequency: 200,
	modulationFrequency: 0,
	type: 'sine',
	typeOptions: ['sine', 'square', 'triangle', 'sawtooth', 'pwm'],
	input: {
		frequency: null
	},
	output: {
		sound: null
	}
}