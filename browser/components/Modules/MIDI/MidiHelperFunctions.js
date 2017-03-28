function midiHelper (attackFn, releaseFn) {
  this.triggerAttack = attackFn
  this.triggerRelease = releaseFn
  this.octave = -2
  this.flags = []

  this.laptopKeyMap = {
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
  return this
}

midiHelper.prototype.formatComputerKeyboardToMidiMessage = function (e, command) {
  const keyCode = (typeof e.which === 'number')? e.which : e.keyCode
  const note = this.laptopKeyMap[keyCode]

  if (keyCode === 189 && command !== 0x08) {
    this.octave -= 1
    return false
  } else if (keyCode === 187 && command !== 0x08) {
    this.octave += 1
    return false
  } else if (note === undefined || (this.flags.indexOf(note) > -1 && command === 0x9)) {
    return false
  }

  // Build the data
  const data = new Uint8Array(3)

  data[0] = (command << 4) + 0x00  // Send the command on channel 0
  data[1] = note + (this.octave * 12)   // Attach the midi note
  data[2] = 127                    // Keyboard keys default to 127 velocity.

  // Package the message
  const midiMsg = {
    data: data,
    timestamp: 0
  }

  return midiMsg
}

  // Update the flag table

midiHelper.prototype.onMidiMessage = function (e, id) {
  if(!e || (this.flags.indexOf(e.data[1]) > -1 && e.data[0] === 144)) { return false }
  const note = e.data[1]
  // if note down
  if (e.data[0] === 144) { this.flags.push(note) }
  // if note release
  else if(e.data[0] === 128) {
    this.flags.splice(this.flags.indexOf(note),1)
  }
  // keyup and still have a note down
  if (e.data[0] === 128 && this.flags.length) {
    e.data[1] = this.flags[this.flags.length - 1]
    e.data[0] = 144
  }

  /**
  * e.data is an array
  * e.data[0] = on (144) / off (128) / detune (224)
  * e.data[1] = midi note
  * e.data[2] = velocity || detune
  */
  // TODO: use midi velocity
  switch(e.data[0]) {
    case 144:
      this.triggerAttack(id, this.midiToKey(e.data[1]))
    break;
    case 128:
      this.triggerRelease(id, this.midiToKey(e.data[1]))
    break;
    case 224:
      console.log('DETUNE')
    break;
  }
}

midiHelper.prototype.midiToKey = function (midiKey) {
  const keyArray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
  const key = keyArray[midiKey % 12]
  const oct = Math.floor(midiKey / 12)
  return key + oct.toString()
}

export default midiHelper