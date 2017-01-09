import React from 'react'
import KnobComponent from './KnobComponent'



const Knob = ({name, min, max, value, degreesTotal, sensitivity, onNewValue}) => {

  const calculateDegreesFromValue = (newValue) => {
    return (((value - min) / max) * degreesTotal) - ((degreesTotal - 180)/2)
  }

  const calculateDegreesFromPercentChange = (percentChange) => {
    const newValue = parseInt(value) + (percentChange/100 * max)
    return newValue <= min ? min
      : newValue >= max ? max
      : newValue
  }


  const onKnobTwist = (percentChange) => {
    const newValue = calculateDegreesFromPercentChange(percentChange)
    onNewValue(newValue)
  }

  return (
    <KnobComponent
      degreesValue={calculateDegreesFromValue(value)}
      sensitivity={sensitivity}
      onChange={(p) => onKnobTwist(p)}
      name={name}
    />
  )
}

export default Knob
