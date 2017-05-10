// inspiration from http://codepen.io/blucube/pen/cudAz
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const KnobComponent = ({name, degreesValue, degreesTotal, sensitivity, onChange}) => {
  let initialPositionOfYOnClickDown = 0

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
      <div className='knob-centering'>
        <div
          style={{transform: `rotate(${degreesValue}deg)`}}
          className='knob'
          onMouseDown={(e) => onMouseDown(e)}
        >
          <div className='line'></div>
        </div>

        <div className={`ticks-container ticks-${degreesTotal}`}>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
        </div>
      </div>

      {name ? <h5 className='knob-name'>{name}</h5> : null }
    </div>
  )
}

export default KnobComponent

KnobComponent.propTypes = {
  name: PropTypes.string,
  degreesValue: PropTypes.number.isRequired,
  degreesTotal: PropTypes.number.isRequired,
  sensitivity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}