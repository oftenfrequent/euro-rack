//Midi Helper Functions

let octave = 0

const laptopKeyMap = {
  81:  72, // q C5
  87:  74, // w D5
  69:  76, // e E5
  82:  77, // r F5
  84:  79, // t G5
  89:  81, // y A5
  85:  83, // u B5
  73:  84, // i C6
  79:  86, // o D6
  80:  88, // p E6
  219: 89, // [ F6
  221: 91, // ] G6

  83:  61, // s C#4
  68:  63, // d D#4
  71:  66, // g F#4
  72:  68, // h G#4
  74:  70, // j A#4
  76:  73, // l C#5
  186: 75, // ; D#5

  90:  60, // z C4
  88:  62, // x D4
  67:  64, // c E4
  86:  65, // v F4
  66:  67, // b G4
  78:  69, // n A4
  77:  71, // m B4
  188: 72, // , C5
  190: 74, // . D5
  191: 76, // / E5
}

// Keep track of keydown and keyup events so that the keydown event doesn't
// send messages repeatedly until keyup.
const flags = {};

export const formatToMidiMessage = (e, command, cb, id, gateColor1, gateColor2, freqColor1, freqColor2) => {
  const keyCode = (typeof e.which === 'number')? e.which : e.keyCode

  const note = laptopKeyMap[keyCode]

  if (keyCode === 189 && command !== 0x08) {
    octave -= 1
    return false
  } else if (keyCode === 187 && command !== 0x08) {
    octave += 1
    return false
  } else if (note === undefined || (flags[note] && command === 0x9)) {
    return false
  }

  // Build the data
  const data = new Uint8Array(3)

  data[0] = (command << 4) + 0x00  // Send the command on channel 0
  data[1] = note + (octave * 12)   // Attach the midi note
  data[2] = 127                    // Keyboard keys default to 127 velocity.

  // Package the message
  const msg = {
    data: data,
    timestamp: 0
  }

  // Send it
  onMidiMessage(msg, cb, id, gateColor1, gateColor2, freqColor1, freqColor2)

  // Update the flag table
  if (command === 0x9) { flags[note] = true }
  else { flags[note] = false }
}

export const onMidiMessage = (e, cb, id, gateColor1, gateColor2, freqColor1, freqColor2) => {
  /**
  * e.data is an array
  * e.data[0] = on (144) / off (128) / detune (224)
  * e.data[1] = midi note
  * e.data[2] = velocity || detune
  */
  // TODO: use midi velocity
  switch(e.data[0]) {
    case 144:
      console.log('NOTE HIT')
      cb(id, midiToKey(e.data[1]), gateColor1, gateColor2, freqColor1, freqColor2)
    break;
    case 128:
      console.log('NOTE RELEASE')
      cb(id, midiToKey(e.data[1]), gateColor1, gateColor2, freqColor1, freqColor2)
    break;
    case 224:
      console.log('DETUNE')
    break;
  }
}

const midiToKey = (midiKey) => {
  const keyArray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
  const key = keyArray[midiKey % 12]
  const oct = Math.floor(midiKey / 12)
  return key + oct.toString()
}