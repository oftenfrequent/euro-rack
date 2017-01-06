import React from 'react'
import KnobComponent from './KnobComponent'



const Knob = ({name, min, max, value, degreesTotal, sensitivity, onNewValue}) => {
  let degreesValue = ((value - min) / max) * degreesTotal


  const calculateDegreesFromValue = (newValue) => {
    return ((value - min) / max) * degreesTotal
  }

  const calculateDegreesFromPercentChange = (percentChange) => {
    const newValue = parseInt(value) + (percentChange/100 * max)
    return newValue <= min ? min
      : newValue >= max ? max
      : newValue
  }


  const onKnobTwist = (percentChange) => {
    const newValue = calculateDegreesFromPercentChange(percentChange)
    degreesValue = calculateDegreesFromValue(newValue)
    onNewValue(newValue)
  }

  return (
    <div className='knob-container'>
      <KnobComponent
        degreesValue={degreesValue}
        sensitivity={sensitivity}
        onChange={(p) => onKnobTwist(p)}
      />
      <h5 className='knob-name'>{name}</h5>
    </div>
  )
}

export default Knob
