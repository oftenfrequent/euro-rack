export function errorConnectingMidi(id, error) {
	return {
		type: 'MIDI_CONNECTION_ERROR',
		id,
		error
	}
}
export function setMidiInputDevice(id, input) {
	return {
		type: 'SET_MIDI_INPUT',
		id,
		input
	}
}
export function midiGateAttackTrigger(id, freq, gateColor, freqColor) {
	return {
		type: 'MIDI_GATE_ATTACK_TRIGGER',
		id,
		freq,
		gateColor,
		freqColor
	}
}
export function midiGateReleaseTrigger(id, freq, gateColor) {
	return {
		type: 'MIDI_GATE_RELEASE_TRIGGER',
		id,
		freq,
		gateColor
	}
}