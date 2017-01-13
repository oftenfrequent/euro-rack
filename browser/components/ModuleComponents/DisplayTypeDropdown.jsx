import React from 'react'

const DisplayTypeDropdown = ({optionTypes, changeType}) => {
  const onChangeType = (e) => changeType(e.target.value)

  return (
    <div className='display-type-container'>
      <select
        className='display-type-dropdown'
        onChange={(e) => onChangeType(e)}>
        {optionTypes.map( opt =>
          <option key={opt} value={opt}>{opt}</option>
        )}
      </select>
    </div>
  )
}

DisplayTypeDropdown.propTypes = {
  optionTypes: React.PropTypes.array.isRequired,
  changeType: React.PropTypes.function
}

export default DisplayTypeDropdown



