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
				text: 'Let\'s start by getting you used to patching modules together! We have an Voice Controlled Oscillator (VCO) and a Speaker here. Start by connecting the output of the Sine wave to the Speaker!',
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
				text: 'Great! Now you have a super annoying tone! We can spice this up a bit by utilizing a Low Frequency Oscillator (LFO) to modulate the frequency of the Oscillator. Use a Sawtooth wave to modulate the frequency of the Oscillator. Also be sure to turn up the knobs on the LFO to hear some funkiness!',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'lfos',
				outputId: null, // added by middleware
				outputCvName: 'sawtooth',
				hasStepCompleted: (state) => {
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
				text: 'Next we will add a Filter to remove or enhance the final sound. However, we have to route the sound through the Filter in order to hear its effects. Which means that we, must first, move remove a connection point! Start by right-clicking the VCO to Speaker connection to remove the patch cable.',
				inputModule: 'speaker',
				inputId: 'only',
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
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
				text: 'Whew! Now that sound is gone, route the Triangle waveform out of the VCO to the input of the Filter...',
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
				text: 'Good stuff! You can now play with the frequency of the Filter to alter the final sound!',
				userStep: false,
				onStep: () => { setTimeout(() => props.addMIDI(), 8000) },
				hasStepCompleted: (state) => Array.from(state.midis.keys()).length > 0
			},
			{
				userStep: true,
				text: 'But this setup can get a little boring. So let\'s get introduced to the MIDI Device! If you have a USB MIDI keybaord available please plug it in now and hit the button \'Check for Midi Devices\' and subsequently select it from the dropdown or to enable your computer\'s keyboard select \'Latptop Keyboard\'.',
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
				text: 'In order to get the VCO to play the notes from your keyboard of choice we need to start by removing the modulation on the Oscillator.',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'lfos',
				outputId: null, // added by middleware
				outputCvName: 'sawtooth',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = true
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'lfos' &&
								con.getIn(['output', 'cvName']) === 'sawtooth' &&
								con.getIn(['input', 'module']) === 'oscillators' &&
								con.getIn(['input', 'cvName']) === 'frequency'
							) {
							success = false
						}
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'Great! Now let\'s send the incoming MIDI signals to the Oscillator so it can play the correct frequency. Connect cv out on the MIDI component to the frequency on the Oscillator.',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'midis',
				outputId: null, // added by middleware
				outputCvName: 'cvToFreq1',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'midis' &&
								con.getIn(['output', 'cvName']) === 'cvToFreq1' &&
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
				userStep: true,
				text: 'Now if you hit some keys you should see the frequency on the Oscillator change to reflect the note you hit! Pretty cool huh? But you want that LFO back don\'t you? Well thats what the second CV jack on the Oscillator is for. Plug the sine wave of the LFO back into the Oscillator to modulate the frequency.',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'cvFrequency',
				outputModule: 'lfos',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'lfos' &&
								con.getIn(['output', 'cvName']) === 'sine' &&
								con.getIn(['input', 'module']) === 'oscillators' &&
								con.getIn(['input', 'cvName']) === 'cvFrequency'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				text: 'Now that we\'ve seen we can control the frequency of the VCO with our handy dandy MIDI device, let\'s see what the gate jack is all about with the help of the Envelope Module.',
				userStep: false,
				onStep: () => { setTimeout(() => props.addEnvelope(), 8000) },
				hasStepCompleted: (state) => Array.from(state.envelopes.keys()).length > 0
			},
			{
				userStep: true,
				text: 'An Envelope Module is used to change the value of a perameter over time, going from min to max and then staying at the sustain level until it is released, in which it returns back to the minimum value. That may sound confusing but let\'s see the envelope in action by connecting it to the LFO amplitude.',
				inputModule: 'lfos',
				inputId: null, // added by middleware
				inputCvName: 'amplitude',
				outputModule: 'envelopes',
				outputId: null, // added by middleware
				outputCvName: 'output1',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'envelopes' &&
								con.getIn(['output', 'cvName']) === 'output1' &&
								con.getIn(['input', 'module']) === 'lfos' &&
								con.getIn(['input', 'cvName']) === 'amplitude'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'Notice the modulation of the frequency went away? That\'s because the Envelope is sitting at the minimum since it has not been triggered! In order to trigger it, we need to plug in the gate of the MIDI Module to the Envelope so that when we hit a key on the keyboard, it will trigger the envelope and release it when we release the key! Play with the settings of the Envelope to see how the sound changes over time.',
				inputModule: 'envelopes',
				inputId: null, // added by middleware
				inputCvName: 'trigger',
				outputModule: 'midis',
				outputId: null, // added by middleware
				outputCvName: 'gate1',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'midis' &&
								con.getIn(['output', 'cvName']) === 'gate1' &&
								con.getIn(['input', 'module']) === 'envelopes' &&
								con.getIn(['input', 'cvName']) === 'trigger'
							) {
							success = true
						}
					})
					state.lfos.map( id => {
						console.log('id', id)
						if (id.get('attack') === 10 ||
								id.get('decay') === 200 ||
								id.get('attack') === 1000 ||
								id.get('decay') === 600) {
							success = false
						}
					})
					return success
				}
			},
			{
				text: 'There\'s only one module left to learn and that is the Voice Controlled Amplifier (VCA).',
				userStep: false,
				onStep: () => { setTimeout(() => props.addVCA(), 8000) },
				hasStepCompleted: (state) => Array.from(state.vcas.keys()).length > 0
			},
			{
				userStep: true,
				text: 'The VCA allows you to combine sound inputs and control the volume of the combined output. To see it in action let\'s first remove the output of the VCO from the filter.',
				inputModule: 'filters',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'triangle',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = true
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'triangle' &&
								con.getIn(['input', 'module']) === 'filters' &&
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
				text: 'Then we should hook up the sine wave to the VCA.',
				inputModule: 'vcas',
				inputId: null, // added by middleware
				inputCvName: 'audioIn1',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'sine' &&
								con.getIn(['input', 'module']) === 'vcas' &&
								con.getIn(['input', 'cvName']) === 'audioIn1'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'And the sawtooth while we\'re at it.',
				inputModule: 'vcas',
				inputId: null, // added by middleware
				inputCvName: 'audioIn2',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sawtooth',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'oscillators' &&
								con.getIn(['output', 'cvName']) === 'sawtooth' &&
								con.getIn(['input', 'module']) === 'vcas' &&
								con.getIn(['input', 'cvName']) === 'audioIn2'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				userStep: true,
				text: 'Now let\'s hook up the VCA to the Filter so that we can hear the final output!',
				inputModule: 'filters',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'vcas',
				outputId: null, // added by middleware
				outputCvName: 'audio',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'vcas' &&
								con.getIn(['output', 'cvName']) === 'audio' &&
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
				text: 'And finally we will attach the Envelope Output to the VCA cv so that the Envelope can control the volume of the overall output! ',
				inputModule: 'vcas',
				inputId: null, // added by middleware
				inputCvName: 'cv1',
				outputModule: 'envelopes',
				outputId: null, // added by middleware
				outputCvName: 'output2',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
					let success = false
					connections.map(con => {
						if (con.getIn(['output', 'module']) === 'envelopes' &&
								con.getIn(['output', 'cvName']) === 'output2' &&
								con.getIn(['input', 'module']) === 'vcas' &&
								con.getIn(['input', 'cvName']) === 'cv1'
							) {
							success = true
						}
					})
					return success
				}
			},
			{
				text: 'Now hit some keys and listen to the patch you made!',
				userStep: false,
				onStep: () => { },
				hasStepCompleted: (state) => false
			},
		]
	}

	nextStep() {
		console.log('this', this)
		this.currentStep++
		if (!this.steps[this.currentStep].userStep) {
			this.steps[this.currentStep].onStep()
		}
			this.reduxCb(this.steps[this.currentStep])
		// } else {
		// }
		// this.reduxCb(this.steps[this.currentStep])
	}
}
