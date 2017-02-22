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
export function midiGateAttackTrigger(id, freq, gateColor1, gateColor2, freqColor1, freqColor2) {
	return {
		type: 'MIDI_GATE_ATTACK_TRIGGER',
		id,
		freq
	}
}
export function midiGateReleaseTrigger(id, freq, gateColor1, gateColor2) {
	return {
		type: 'MIDI_GATE_RELEASE_TRIGGER',
		id,
		freq,
	}
}