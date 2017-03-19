export function walkthroughStep(walkthroughStepObject) {
	console.log('walkthroughStepObject', walkthroughStepObject)
	return {
		type: 'WALKTHROUGH_STEP',
		inputModule: walkthroughStepObject.inputModule,
		inputId: walkthroughStepObject.inputId,
		inputCvName: walkthroughStepObject.inputCvName,
		outputModule: walkthroughStepObject.outputModule,
		outputCvName: walkthroughStepObject.outputCvName,
		outputId: walkthroughStepObject.outputId,
		text: walkthroughStepObject.text
	}
}


export class walkthrough {
	constructor(name, cb) {
		const _this = this
		this.name = name
		this.currentStep = -1
		this.steps = [
			{
				text: "Let's start by getting you used to patching modules together! We have an Oscillator and a Speaker here. Start by connecting the output of the Sine wave to the Speaker!",
				inputModule: 'speaker',
				inputId: 'only',
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				stepCompleted: function (state) {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = false
					connections.map(con => {
						console.log('con', con)
						console.log('con', con.getIn(['output', 'module']))
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'sine' &&
								con.getIn(['input', 'module']) === 'speaker' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = true
						}
					})
					return success
				}
			},{
				text: "Next we will add an Low Frequency Oscillator (LFO) to modulate the frequency of the Oscillator",
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine'
			}
		]
		this.reduxCb = cb
	}

	nextStep() {
		this.currentStep++
		this.reduxCb(this.steps[this.currentStep])
	}
}
