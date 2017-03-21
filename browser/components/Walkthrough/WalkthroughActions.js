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
				text: 'Great! Now you have a super annoying tone! We can spice this up a bit by utilizing a Low Frequency Oscillator (LFO) to modulate the frequency of the Oscillator. Use a Sawtooth wave to modulate the frequency of the Oscillator. Also be sure to turn up the knobs on the LFO to move on!',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'lfos',
				outputId: null, // added by middleware
				outputCvName: 'sawtooth',
				hasStepCompleted: (state) => {
					// return false
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					console.log('connections', connections)
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'lfos' &&
								con.getIn(['output', 'cvName']) === 'sawtooth' &&
								con.getIn(['input', 'module']) === 'oscillators' &&
								con.getIn(['input', 'cvName']) === 'frequency'
							) {
							success = true
						}
					})
					state.lfos.map( id => {
						console.log('id', id)
						if (id.get('frequency') === 0.01 ||
								id.get('percentChange') === 0) {
							success = false
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
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'filters' &&
								con.getIn(['output', 'cvName']) === 'sound' &&
								con.getIn(['input', 'module']) === 'speaker' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				userStep: false,
				onStep: () => { props.addMIDI() },
				hasStepCompleted: (state) => Array.from(state.midis.keys()).length > 0
			},
			{
				userStep: true,
				text: 'Now you have access to a MIDI Device! Please plug in a MIDI Keyboard and hit the button \'Check for Midi Devices\' and select it from the dropdown or select \'Latptop Keyboard\' to enable your computer keyboard.',
				// inputModule: 'speaker',
				// inputId: null, // added by middleware
				// inputCvName: 'sound',
				// outputModule: 'midis',
				// outputId: null, // added by middleware
				// outputCvName: 'sound',
				hasStepCompleted: (state) => {
					let success = false
					state.midis.map( id => {
						if(id.get('inputDevice')) success = true
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'Let\'s start by removing the modulation on the Oscillator.',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'midis',
				outputId: null, // added by middleware
				outputCvName: 'sound',
				hasStepCompleted: (state) => {
					let success = false
					state.midis.map( id => {
						if (con.getIn(['output', 'module']) === 'filters' &&
								con.getIn(['output', 'cvName']) === 'sound' &&
								con.getIn(['input', 'module']) === 'speaker' &&
								con.getIn(['input', 'cvName']) === 'sound'
							) {
							success = true
						}
						if(id.get('inputDevice')) success = true
					})
					return success
				}
			},
			// {
			// 	userStep: true,
			// 	text: 'The MIDI Module will now recieve notes you play on your midi keyboard or laptop keyboard and route them out through the \'cv out\' jacks. First remove the LFO patch to the Oscillator.',
			// 	inputModule: 'oscillators',
			// 	inputId: null, // added by middleware
			// 	inputCvName: 'frequency',
			// 	outputModule: 'lfos',
			// 	outputId: null, // added by middleware
			// 	outputCvName: 'sine',
			// 	hasStepCompleted: (state) => {
			// 		// return false
			// 		const connections = state.eurorack.getIn(['patchCables', 'connections'])
			// 		console.log('connections', connections)
			// 		let success = true
			// 		connections.map(con => {
			// 			if (con.getIn(['output', 'module']) === 'lfos' &&
			// 					con.getIn(['output', 'cvName']) === 'sine' &&
			// 					con.getIn(['input', 'module']) === 'oscillators' &&
			// 					con.getIn(['input', 'cvName']) === 'frequency'
			// 				) {
			// 				success = false
			// 			}
			// 		})
			// 		return success
			// 	}
			// },
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
