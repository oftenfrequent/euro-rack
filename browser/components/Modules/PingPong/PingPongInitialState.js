import Tone from 'tone'

const initialState = () => {
  return {
    toneComponent: new Tone.PingPongDelay({
      delayTime: 0.25,
      wet: 0,
      feedback: 0,
    }),

    timelineBased: false,
    valueOptions: ['8m','4m','2m','1m','2n','3n','4n','8n','12n','16n'],
    timelineFrequency: '4n',

    delayTime: 250,
    minDelayTime: 250,
    maxDelayTime: 10000,

    wetness: 0,
    feedback: 0,
    min: 0,
    max: 1000,

  	input: {
  		sound: {
        attention: false,
        color: null
      },
      wetness: {
        attention: false,
        color: null
      },
      delayTime: {
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
