import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { userSignup } from './AuthActions'

export class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = { error: false }
  }

  handleSubmit (e) {
    e.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value

    this.props.userSignup(email, pass)
  }

  render () {
    return (
      <form onSubmit={(e) => {this.handleSubmit(e)}}>
        <input type='text' ref="email" placeholder="email" />
        <br/>
        <input type='password' ref="pass" placeholder="password" /><br />
        <input type='password' ref="confPass" placeholder="confirm password" /><br />
        <button type="submit">signup</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
}

function mapStateToProps (state, props) {
  return {}
}

export default connect(
  mapStateToProps,
  {
    userSignup
  }
)(SignupForm)

