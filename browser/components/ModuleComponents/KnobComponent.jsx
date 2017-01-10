import React from 'react'
import { connect } from 'react-redux'

const KnobComponent = ({name, degreesValue, degreesTotal, sensitivity, onChange}) => {
  let initialPositionOfYOnClickDown = 0
  // let valueMarks = Math.floor(degreesTotal / 30) + 1

  const distanceToPercentageChange = (distance) => {
    return distance >= sensitivity ? 100 :
           distance <= -1*(sensitivity) ? -100 : (distance/sensitivity)*100
  }

  const onMouseDown = (e) => {
    e.preventDefault();
    initialPositionOfYOnClickDown = e.clientY
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMove))
  }

  const handleMouseMove = (e) => {
    const y = e.clientY
    const difference = (initialPositionOfYOnClickDown - y)
    const percentChange = distanceToPercentageChange(difference)
    onChange(percentChange)
  }

  return (
    <div className='knob-container'>
      <div className='value-centering'>
        <div className='value-line'>
          <div className='line-container'>
            <div className='min-line'></div>
          </div>
          <div className='max-line'></div>
        </div>
      </div>
      <div className='knob-centering'>
        <div
          style={{transform: `rotate(${degreesValue}deg)`}}
          className='knob'
          onMouseDown={(e) => onMouseDown(e)}
        >
          <div className='line'></div>
        </div>
      </div>

      <h5 className='knob-name'>{name}</h5>
    </div>
  )
}

export default KnobComponent
