import React from 'react'
import classNames from 'classnames'
import { findDOMNode } from 'react-dom'

import dnd from '../Helpers/dragAndDropSetAndGet'

export class ModuleContainer extends React.Component {
  constructor(props){
    super(props)
    this.screwArr = [0,0,0,0].map(() => Math.floor(Math.random() * 180))
    this.state = { moving: false }
  }

  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move'
    this.setState({moving: true})
    dnd.setActiveModuleId(this.props.id)
  }

  dragEnd(e) { this.setState({moving: false}) }

  dragEnter(e) {
    if(!(this.props.draggable === false)) {
      const moduleComponentBounds = findDOMNode(this).getBoundingClientRect()
      const mousePositionY = e.clientY
      const mousePositionX = e.clientX

      const verticallyInBounds = moduleComponentBounds.top < mousePositionY && moduleComponentBounds.bottom > mousePositionY
      const notSameModule = dnd.getActiveModuleId !== this.props.id
      if (verticallyInBounds && notSameModule) {
        if (mousePositionX < moduleComponentBounds.right &&
            mousePositionX > moduleComponentBounds.left) {
          this.props.changeOrder(this.props.order)
        }
      }
    }
  }

  removeModule() {
    if(this.props.removeModule) { this.props.removeModuleFunction() }
  }

  render(){
    const contClassNames = classNames('module-container', {
      'moving': this.state.moving,
      [this.props.containerClass]: this.props.containerClass ? true : false
    })
    const deleteScrewClassNames = classNames('screw', {
      'screw--delete': this.props.removeModule
    })
    const isNotDraggable = this.props.draggable === false
    return (
      <div
        draggable={isNotDraggable ? false : true}
        className={contClassNames}
        onDragStart={(e) => this.dragStart(e)}
        onDragEnd={(e) => this.dragEnd(e)}
        onDragEnter={(e) => this.dragEnter(e)}
        style={{'order': this.props.order}}
      >
        <div className='screw-row'>
          <div
            className='screw'
            style={{transform: `rotate(${this.screwArr[0]}deg)`}}
          >
            <div className='indent'></div>
            <div className='indent vert'></div>
          </div>
          <div
            className={deleteScrewClassNames}
            onClick={() => this.removeModule()}
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
            className='screw'
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
