import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const DisplayTypeDropdown = ({optionTypes, changeType, defaultValue}) => {
  const onChangeType = (e) => changeType(e.target.value)

  return (
    <div className='display-type-container'>
      <select
        className='display-type-dropdown'
        onChange={(e) => onChangeType(e)}
        defaultValue={defaultValue}
      >
        {optionTypes.map( opt =>
          <option key={opt} value={opt}>{opt}</option>
        )}
      </select>
    </div>
  )
}

DisplayTypeDropdown.propTypes = {
  optionTypes: ImmutablePropTypes.list.isRequired,
  changeType: React.PropTypes.func
}

export default DisplayTypeDropdown



