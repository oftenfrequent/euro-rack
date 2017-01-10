import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import { connectJack } from '../EuroRackActions'
import ModuleContainer from '../ModuleComponents/ModuleContainer'
import DisplayAmount from '../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../ModuleComponents/DisplayTypeDropdown'
import Knob from '../ModuleComponents/Knob'
import Jack from '../ModuleComponents/Jack'

export class MasterOut extends React.Component {
  constructor(props){
    super(props)
    this.speakerArray = [6,10,14,14,14,14,14,14,14,14,10,6]
  }

  selectJack() {
    this.props.connectJack('master')
  }

  render(){
    return (
      <ModuleContainer name='Master Out'>
        <div className='master-out-jack'>
          <Jack name='in' onJackClick={() => this.selectJack()} />
        </div>
        <div className='speaker-hole-container'>
          {this.speakerArray.map( (num,i) =>
            <div className='speaker-hole-row' key={i} >
              {Array.from(Array(num)).map( (i,j) => <div className='speaker-hole' key={j}></div>)}
            </div>

          )}
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(
  mapStateToProps,
  {
    connectJack
  }
)(MasterOut)