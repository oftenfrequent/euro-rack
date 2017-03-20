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
	constructor(name, props) {
		const _this = this
		this.name = name
		this.currentStep = -1
		this.reduxCb = props.walkthroughStep
		// this.stepInitialized = false
		this.steps = [
			{
				userStep: false,
				onStep: () => { props.addOscillator() },
				hasStepCompleted: (state) => Array.from(state.oscillators.keys()).length > 0
			},
			{
				userStep: true,
				text: 'Let\'s start by getting you used to patching modules together! We have an Oscillator and a Speaker here. Start by connecting the output of the Sine wave to the Speaker!',
				inputModule: 'speaker',
				inputId: 'only',
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'sine' &&
								con.getIn(['input', 'module']) === 'speaker' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = true
						}
					})
					return success
				},
			},
			{
				userStep: false,
				onStep: () => { props.addLFO() },
				hasStepCompleted: (state) => Array.from(state.lfos.keys()).length > 0
			},
			{
				userStep: true,
				text: 'Next we will add an Low Frequency Oscillator (LFO) to modulate the frequency of the Oscillator. /n /n Feel free to play with the settings on the LFO!',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'lfos',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
					// return false
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'lfos' &&
								con.getIn(['output', 'cvName']) === 'sine' &&
								con.getIn(['input', 'module']) === 'oscillators' &&
								con.getIn(['input', 'cvName']) === 'frequency'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				userStep: false,
				onStep: () => { props.addFilter() },
				hasStepCompleted: (state) => Array.from(state.filters.keys()).length > 0
			},
			{
				userStep: true,
				text: 'Next we will add a Filter to remove or enhance the final sound. But first, we move remove a connection point! /n /n  Start by right-clicking the VCO->Speaker connection to remove the patch cable.',
				inputModule: 'speaker',
				inputId: 'only',
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
					// return false
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = true
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'sine' &&
								con.getIn(['input', 'module']) === 'speaker' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = false
						}
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'Now route the Triangle out of the VCO to the input of the Filter...',
				inputModule: 'filters',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'triangle',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'triangle' &&
								con.getIn(['input', 'module']) === 'filters' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'Then the output of the Filter to Speaker to hear the final output.',
				inputModule: 'speaker',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'filters',
				outputId: null, // added by middleware
				outputCvName: 'sound',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = true
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'filters' &&
								con.getIn(['output', 'cvName']) === 'sound' &&
								con.getIn(['input', 'module']) === 'speaker' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = false
						}
					})
					return success
				}
			}
		]
	}

	nextStep() {
		console.log('this', this)
		this.currentStep++
		if (this.steps[this.currentStep].userStep) {
			this.reduxCb(this.steps[this.currentStep])
		} else {
			this.steps[this.currentStep].onStep()
		}
		// this.reduxCb(this.steps[this.currentStep])
	}
}
