import React from 'react'
import KnobComponent from './KnobComponent'
import PropTypes from 'prop-types'

const Knob = ({name, min, max, value, degreesTotal, sensitivity, onNewValue}) => {

  const calculateDegreesFromValue = (newValue) => {
    return (((value - min) / max) * degreesTotal) - ((degreesTotal - 180)/2)
  }

  const calculateDegreesFromPercentChange = (percentChange) => {
    const newValue = parseInt(value) + (percentChange/sensitivity * max)
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
      degreesTotal={degreesTotal}
      sensitivity={sensitivity}
      onChange={(p) => onKnobTwist(p)}
      name={name}
    />
  )
}

export default Knob


Knob.propTypes = {
  name: React.PropTypes.string,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  degreesTotal: React.PropTypes.number.isRequired,
  sensitivity: React.PropTypes.number.isRequired,
  onNewValue: React.PropTypes.func.isRequired
}