import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { resetEuroRack } from '../components/EuroRack/EuroRackActions'
import LoginForm from '../components/Auth/LoginForm'

export class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render () {
    return (
      <div className='container'>
        <h1>Home Page</h1>
        <br/>
        <br/>
        <br/>
        <p>Built and maintained by Kyle Burke</p>
        <p>Blah blah here's a bunch of other stuff</p>
        <LoginForm/>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    // auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  {

 }
)(HomePage)

