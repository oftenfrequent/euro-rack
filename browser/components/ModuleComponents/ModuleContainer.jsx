import React from 'react'
import classNames from 'classnames'

export class ModuleContainer extends React.Component {
  constructor(props){
    super(props)
    this.screwArr = [0,0,0,0].map(() => Math.floor(Math.random() * 180))
  }

  render(){
    const contClassNames = classNames({
      'module-container': true,
      [this.props.containerClass]: this.props.containerClass ? true : false
    })
    return (
      <div className={contClassNames} >
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
        <h5 className='module-name'>{this.props.name}</h5>
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
