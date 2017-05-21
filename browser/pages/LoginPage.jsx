import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { resetEuroRack } from '../components/EuroRack/EuroRackActions'
import LoginForm from '../components/Auth/LoginForm'

export class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render () {
    return (
      <div className='container'>
        <h1>Login Page</h1>
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
)(LoginPage)

