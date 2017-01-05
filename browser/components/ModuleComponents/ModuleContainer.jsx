import React from 'react'
import { connect } from 'react-redux'

export class ModuleContainer extends React.Component {
  constructor(props){
    super(props)
    this.screwArr = [0,0,0,0]
    console.log('screwArr', this.screwArr)
    this.screwArr = this.screwArr.map(() => this.generateRandomDegrees())
  }

  generateRandomDegrees() {
    return Math.floor(Math.random() * 180)
  }



  render(){
    console.log('screwArr', this.screwArr)
    return (
      <div className='module-container'>
        <div className='screw-row'>
          <div
            className='screw'
            style={{transform: `rotate(${this.screwArr[0]}deg)`}}
          >
            <div className='indent'></div>
            <div className='indent vert'></div>
          </div>
          <div
            className='screw right'
            style={{transform: `rotate(${this.screwArr[1]}deg)`}}
          >
            <div className='indent'></div>
            <div className='indent vert'></div>
          </div>
        </div>
        <div className='module-container--content'>
          {this.props.children}
        </div>
        <div className='screw-row screw-row--bottom'>
          <div
            className='screw'
            style={{transform: `rotate(${this.screwArr[2]}deg)`}}
          >
            <div className='indent'></div>
            <div className='indent vert'></div>
          </div>
          <div
            className='screw right'
            style={{transform: `rotate(${this.screwArr[3]}deg)`}}
          >
            <div className='indent'></div>
            <div className='indent vert'></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModuleContainer
