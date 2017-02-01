import Tone from 'tone'

export default {
	toneComponent: new Tone.AmplitudeEnvelope(0.01, 0.2, 1, 0.6),
  min: 10,
  max: 1000,
  attack: 0,
  decay: 200,
  sustain: 1000,
  release: 600,
	attackCurve: 'linear',
	releaseCurve: 'exponential',
  curveOptions: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step'],
	input: {
		sound: null,
		frequency: null,
		trigger: null
	},
	output: {
		sound: null
	}
}