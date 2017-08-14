import React from 'react'
import { Link } from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export class NotFoundPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render () {
    return (
      <div className='container'>
        <h2>Page Not Found</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    )
  }
}