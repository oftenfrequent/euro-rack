import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { userLogin } from './AuthActions'

export class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = { error: false }
  }

  handleSubmit (e) {
    e.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value

    this.props.userLogin(email, pass)
  }

  render () {
    return (
      <form onSubmit={(e) => {this.handleSubmit(e)}}>

        <div className='six columns'>
          <input type='text' ref='email' placeholder='email' defaultValue='asd@asd' />
        </div>
        <div className='six columns'>
          <input type='password' ref='pass' placeholder='password' />
        </div>
        <div className='twelve columns'>
          <button type='submit'>login</button>
        </div>
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
    userLogin
  }
)(LoginForm)

