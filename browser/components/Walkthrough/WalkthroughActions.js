export function walkthroughStep(walkthroughStepObject) {
	return {
		type: 'WALKTHROUGH_STEP',
		inputModule: walkthroughStepObject.inputModule,
		inputId: walkthroughStepObject.inputId,
		inputCvName: walkthroughStepObject.inputCvName,
		outputModule: walkthroughStepObject.outputModule,
		outputCvName: walkthroughStepObject.outputCvName,
		outputId: walkthroughStepObject.outputId,
		text: walkthroughStepObject.text,
		completedText: walkthroughStepObject.completedText
	}
}

export function walkthroughStepCompleted() {
	return {
		type: 'WALKTHROUGH_STEP_COMPLETED'
	}
}

export function walkthroughCompleted() {
	return {
		type: 'WALKTHROUGH_COMPLETED'
	}
}

export class walkthrough {
	constructor(name, props) {
		const _this = this
		this.name = name
		this.currentStep = -1
		this.nextReduxStep = props.walkthroughStep
		this.steps = [
			{
				onStep: () => { props.addOscillator() },
				hasStepCompleted: (state) => Array.from(state.oscillators.keys()).length > 0,
				text: '',
				completedText: '<p>Welcome to the first web-based modular synth application. This walkthrough will help you learn the basics of synthesis and how to patching modules together. At any point you can click on this tab to hide it.</p>',
			},
			{
				text: '<p>Let\'s start by getting you used to patching modules together! We have an Voice Controlled Oscillator (VCO) and a Speaker here. Start by connecting the output of the Sine wave to the Speaker!</p>',
				inputModule: 'speaker',
				inputId: 'only',
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
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
			// {
			// 	text: '',
			// 	completedText: 'We can spice this up a bit by utilizing a Low Frequency Oscillator (LFO) to modulate the frequency of the Oscillator.',
			// 	hasStepCompleted: (state) => Array.from(state.lfos.keys()).length > 0
			// },
			{
				text: '<p>Great! Now you have a super annoying tone! We can spice this up a bit by utilizing a Low Frequency Oscillator (LFO) to modulate the frequency of the Oscillator. Use a Sawtooth wave to modulate the frequency of the Oscillator.</p>',
				completedText: '<p>Be sure to turn up the knobs on the LFO to hear some funkiness!</p>',
				inputModule: 'oscillators',
				inputId: null, // added by middleware
				inputCvName: 'frequency',
				outputModule: 'lfos',
				outputId: null, // added by middleware
				outputCvName: 'sawtooth',
				onStep: () => { props.addLFO() },
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
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
					// state.lfos.map( id => {
					// 	if (id.get('frequency') === 0.01 ||
					// 			id.get('percentChange') === 0) {
					// 		success = false
					// 	}
					// })
					return success
				}
			},
			{
				text: '<p>Next we will add a Filter to remove or enhance the final sound. However, we have to route the sound through the Filter in order to hear its effects. Which means that we, must first, move remove a connection point! Start by right-clicking the VCO to Speaker connection to remove the patch cable.</p>',
				inputModule: 'speaker',
				inputId: 'only',
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'sine',
				onStep: () => { props.addFilter() },
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
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
				text: '<p>Whew! Now that sound is gone, route the Triangle waveform out of the VCO to the input of the Filter.</p>',
				inputModule: 'filters',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'triangle',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
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
				text: '<p>Then the output of the Filter to Speaker to hear the final output.</p>',
				inputModule: 'speaker',
				completedText: '<p>You can adjust the type of filter and the rolloff in the dropdown menus and you can adjust the frequency via the knob. Play around with the different options to hear all the possibilities.</p>',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'filters',
				outputId: null, // added by middleware
				outputCvName: 'sound',
				hasStepCompleted: (state) => {
					const connections = state.eurorack.getIn(['patchCables', 'connections'])
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
				text: '<p>But this setup can get a little boring. So let\'s get introduced to the MIDI Device! If you have a USB MIDI keybaord available please plug it in now and hit the button \'Check for Midi Devices\' and subsequently select it from the dropdown or to enable your computer\'s keyboard select \'Latptop Keyboard\'.</p>',
				completedText: '<p>Now that we have an MIDI device to control the notes we play, lets see how they integrate with different modules.</p>',
				onStep: () => props.addMIDI(),
				hasStepCompleted: (state) => {
					let success = false
					state.midis.map( id => {
						if(id.get('inputDevice')) success = true
					})
					return success
				}
			},
			{
				text: '<p>Let\'s start by getting the Oscillator to play certain notes from the keyboard. However in order to do that, we need to start by removing the modulation on the Oscillator.</p>',
				completedText: '<p>The top cv jack (frequency) is reserved for setting the overall frequency of the VCO.</p>',
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
				text: '<p>Now let\'s send the incoming MIDI signals to the Oscillator so it can play the correct frequency. Connect the first \'cv out\' out on the MIDI component to the frequency on the Oscillator.</p>',
				completedText: '<p>Now if you hit some keys you should see the frequency on the Oscillator change to reflect the note you hit! If you chose to use your computer keyboard z-m and q-p are white keys while select keys in the middle row represent the black keys.</p>',
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
				text: '<p> If you\'re wondering about how to add the LFO modulation back on the oscillator - you might be a mind reader. In any case that\'s what the second CV jack on the Oscillator is for. Plug the sine wave of the LFO back into the Oscillator to modulate the frequency.</p>',
				completedText: '<p>Now that we\'ve seen we can control the frequency of the VCO with our handy dandy MIDI device, let\'s look at another function of the MIDI Module with the help of another module, the Envelope Module.</p>',
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
				text: '<p>An Envelope Module is used to change the value of a parameter over time, going from min to max and then staying at the sustain level until it is released, in which it returns back to the minimum value. That may sound confusing but let\'s see the envelope in action by connecting it to the LFO amplitude.</p>',
				completedText: '<p>Notice the modulation of the frequency went away? That\'s because the Envelope is sitting at the minimum (0) since it has not been triggered! </p>',
				inputModule: 'lfos',
				inputId: null, // added by middleware
				inputCvName: 'amplitude',
				outputModule: 'envelopes',
				outputId: null, // added by middleware
				outputCvName: 'output1',
				onStep: () => props.addEnvelope(),
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
				text: '<p>In order to trigger it, we need to plug in the gate of the MIDI Module to the Envelope so that when we hit a key on the keyboard, it will trigger the envelope and release it when we release the key.</p>',
				completedText: '<p>Play with the settings of the Envelope to see how the sound changes over time. The dropdown lets you choose the overall time setting so if you want the sound to evolve over a longer time, choose \'long\'.</p>',
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
					// state.lfos.map( id => {
					// 	if (id.get('attack') === 10 ||
					// 			id.get('decay') === 200 ||
					// 			id.get('attack') === 1000 ||
					// 			id.get('decay') === 600) {
					// 		success = false
					// 	}
					// })
					return success
				}
			},
			{
				text: '<p>Now we will learn how the Voice Controlled Amplifier (VCA) works. The VCA allows you to combine sound inputs and control the volume of the combined output. To see it in action let\'s first remove the output of the VCO from the filter.</p>',
				inputModule: 'filters',
				inputId: null, // added by middleware
				inputCvName: 'sound',
				outputModule: 'oscillators',
				outputId: null, // added by middleware
				outputCvName: 'triangle',
				onStep: () => props.addVCA(),
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
				text: '<p>Then we should hook up the sine wave to audio in 1 of the VCA.</p>',
				completedText: '<p>You can add another output from the VCO to the VCA as well. Are you feeling the triangle or the sawtooth?</p>',
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
				text: '<p>Now let\'s hook up the VCA to the Filter so that we can hear the final output!</p>',
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
				text: '<p>And finally we will attach the Envelope Output to the VCA cv so that the Envelope can control the volume of the overall output!</p>',
				completedText: '<p>But notice that the noise just went away? This is similar to what happened before when we plugged the Envelope to the LFO. Because the Envelope is not being triggered is is causing the volume output for the VCA to be at -&#x221e;. Hit some keys and start jamming!</p>',
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
				text: '<p>You\'ve now created a basic patch for dynamically creating sound! But there\'s so many more possibilities.</p><p>Which is why we are now giving you the ability to add and remove modules. The top right screw of the modules will become a remove button if you hover over it, and the \'Add Module\' module will allow you to add more instances of any other module. You can also change the order of the modules by dragging them to new positions. Go crazy!</p>',
				onStep: () => setTimeout( () => props.walkthroughCompleted(), 8000),
				hasStepCompleted: (state) => true
			}
		]
	}

	nextStep() {
		this.currentStep++
		if (this.steps[this.currentStep].hasOwnProperty('onStep')) this.steps[this.currentStep].onStep()
		this.nextReduxStep(this.steps[this.currentStep])
	}
}
